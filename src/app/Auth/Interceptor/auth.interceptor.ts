import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../Service/local-storage.service';


export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  
  
  const ls = inject(LocalStorageService);
    
  const token = ls.getVariable('token');
  

  let modifiedRequest = req;

  if(token) {
    modifiedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
      
    });
  } 

  return next(modifiedRequest).pipe(
    tap((event) => {
      if(event instanceof HttpResponse) {
        let newToken: string | undefined;

        if(newToken) {
          ls.setVariable('token', newToken);
        }
      }
    })
  );;
};