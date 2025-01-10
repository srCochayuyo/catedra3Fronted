import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { loginResponse } from '../Interfaces/loginResponse';
import { registerResponse } from '../Interfaces/registerResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:5018/api/auth';
  private http = inject(HttpClient);
  private localStorage = inject(LocalStorageService)
  public errors: string[] = [];

  //POST:login
  login(form: any): Observable<loginResponse> {
    return this.http.post<loginResponse>(this.url + '/login', form).pipe(
      catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Error desconocido';
  
          // Asegúrate de manejar tanto el mensaje de error como el estatus
          if (error.error && error.error.message) {
              errorMessage = error.error.message;
          }
  
          // Lanza un objeto estructurado para que el frontend pueda acceder al mensaje correctamente
          return throwError(() => ({ message: errorMessage, status: error.status }));
      })
  );
  }

  //POST:Register
  async register(form: any): Promise<registerResponse> {
    try {
      const response = await firstValueFrom(
        this.http.post<registerResponse>(this.url + '/register', form)
      );
      return Promise.resolve(response);
    }catch (error) {
      console.log('Error in Register', error);

      let errorMessage = 'Error desconocido';

      if (error instanceof HttpErrorResponse) {
        if (error.error && Array.isArray(error.error)) {
          return Promise.reject(error.error); 
        } else if (error.error && typeof error.error === 'string') {
          return Promise.reject([error.error]); 
        } else if (error.error && typeof error.error === 'object' && error.error.message) {
          return Promise.reject([error.error.message]);
        }
      }
  

      return Promise.reject([errorMessage]);
    }
  }



}
