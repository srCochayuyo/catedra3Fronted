import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../Service/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req : HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  
  
  const localStorage  = Inject(LocalStorageService);

  const token = localStorage.getItem('token');

  let modifiedRequest = req;

  if(token){

    modifiedRequest = req.clone({
      headers: req.headers.set('authorization', `Bearer ${token}` ),
    });
  }

  return next(modifiedRequest).pipe(
    tap((event) => {

      if(event  instanceof HttpResponse)
      {
        const newToken = event.body.token;

        if(newToken)
        {
          localStorage.setItem('token', newToken);
        }
      }
    })
  )
  
  
  
  
  
  return next(req);
};
