import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetPostsResponse, Post } from '../Interfaces/getPostsResponse';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://localhost:5018/api/posts';
  private http = inject(HttpClient);
  public errors: string[] = [];

  
  //GET: get posts
  getPost(): Observable<Post[]> {

    return this.http.get<Post[]>(this.url);    
    
  }

  //POST:Crear Post
    Postear(form: any): Observable<GetPostsResponse> {
      return this.http.post<GetPostsResponse>(this.url, form).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Error desconocido';
    
          if (error.error && Array.isArray(error.error)) {
            errorMessage = error.error.join(', '); // Si el error es un array, unimos los mensajes
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
