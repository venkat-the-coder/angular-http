import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CacheService } from '../cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  cachedResponse: HttpResponse<any>;

  constructor(private cacheService: CacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method != 'GET') {
      this.cacheService.invaidateCache();
      return next.handle(req);
    }

    this.cachedResponse = this.cacheService.get(req.url);

    if (this.cachedResponse) {
      return of(this.cachedResponse);
    } else {
      return next.handle(req).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            this.cacheService.put(event.url, event);
          }
        })
      );
    }
  }
}
