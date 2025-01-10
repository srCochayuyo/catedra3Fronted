import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetPostsResponse, Post } from '../Interfaces/getPostsResponse';
import { Observable } from 'rxjs';

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
}
