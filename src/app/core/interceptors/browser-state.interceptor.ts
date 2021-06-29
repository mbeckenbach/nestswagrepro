import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

/**
 * Browser side http interceptor to avoid duplicate api calls with SSR
 */
@Injectable()
export class BrowserStateInterceptor implements HttpInterceptor {

  /**
   * Constructor
   * @param transferState TransferState
   */
  constructor(private transferState: TransferState) { }

  /**
   * Intercept all http GET requests and reads cached transfer state object if available
   * @param req HttpRequest
   * @param next HttpHandler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET') {
      const key = makeStateKey(req.url);
      const storedResponse = this.transferState.get<string>(key, null);
      if (storedResponse) {
        const response = new HttpResponse({ body: storedResponse, status: 200 });
        return of(response);
      }
    }

    return next.handle(req);
  }
}
