import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

export const CONTENT_TYPE = new HttpContextToken(() => 'application/json');

@Injectable({
    providedIn:'root'
})


export class ContentTypeInterceptor implements HttpInterceptor{
   intercept(request:HttpRequest<any> , next:HttpHandler): Observable<HttpEvent<any>>
   {
      console.log(`intercept executed - ${request.url}`);
      let jsonReq : HttpRequest<any> = request.clone({
        setHeaders:{'content-Type': request.context.get(CONTENT_TYPE)}
      });

      return next.handle(jsonReq); //return same type of observable
   }
    
}


