import {
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { REQUEST } from '@nestjs/ng-universal/dist/tokens';
import { Request } from 'express';

/**
 * Server side http interceptor to avoid duplicate api calls with SSR
 */
@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {

  /**
   * Constructor
   * @param transferState TransferState
   * @param serverRequest Express Request
   */
  constructor(private transferState: TransferState,
              @Optional() @Inject(REQUEST) private serverRequest: Request) { }

  /**
   * Intercept all http requests and sets a transfer state object
   * @param req HttpRequest
   * @param next HttpHandler
   */
  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpSentEvent
    | HttpHeaderResponse
    | HttpResponse<any>
    | HttpProgressEvent
    | HttpUserEvent<any>> {

    return next.handle(req).pipe(
      tap(event => {
        // If request was successful
        if ((event instanceof HttpResponse && (event.status === 200 || event.status === 202))) {
          // Generate key and cache state
          this.transferState.set(makeStateKey(req.url), event.body);
        }
      }),
    );
  }
}
