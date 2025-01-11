import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { catchError, firstValueFrom, Observable, tap, throwError } from 'rxjs';
import { loginResponse } from '../Interfaces/loginResponse';
import { registerResponse } from '../Interfaces/registerResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:5018/api/auth';
  private http = inject(HttpClient);
  public errors: string[] = [];

  // POST: login
  login(form: any): Observable<loginResponse> {
    return this.http.post<loginResponse>(this.url + '/login', form).pipe(
      tap((response) => {
 
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error desconocido';

        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }

       
        return throwError(() => ({ message: errorMessage, status: error.status }));
      })
    );
  }

  //POST:Register
  register(form: any): Observable<registerResponse> {
    return this.http.post<registerResponse>(this.url + '/register', form).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error desconocido';
  
        if (error.error && Array.isArray(error.error)) {
          errorMessage = error.error.join(', '); 
        } else if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error && typeof error.error === 'object' && error.error.message) {
          errorMessage = error.error.message;
        }
  
        return throwError(() => ({ message: errorMessage, status: error.status }));
      })
    );
  }



}
