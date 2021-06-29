import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * SSR related interceptor as we need fully qualified urls for local api calls
 */
@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  /**
   * Intercept local http requests and make sure that base url is set
   * @param req HttpRequest
   * @param next HttpHandler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.startsWith('/')) {
      const prefixedUrl = `${environment.baseUrl}${req.url}`;
      return next.handle(req.clone({ url: prefixedUrl }));
    }

    return next.handle(req);
  }
}
