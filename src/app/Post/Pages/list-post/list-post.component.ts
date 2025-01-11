import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { GetPostsResponse, Post } from '../../Interfaces/getPostsResponse';
import { PostService } from '../../Service/post.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'post',
  standalone: true,
  imports: [CommonModule,RouterModule],
  providers: [DatePipe,PostService],
  templateUrl: './list-post.component.html',
  styleUrl: './list-post.component.css'
})
export class ListPostComponent implements OnInit {

  posts: Post[] = [];

  private postService = inject(PostService);
  private datePipe = inject(DatePipe);


  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    try {
      const observer = {
        next: (response: any) => {
          console.log(response.posts);  
          this.posts = response.posts;  
        },
        error: (error: any) => {
          console.error(error);  
        }
      };
  
      this.postService.getPost().subscribe(observer);
    } catch (error: any) {
      console.error(error); 
    }
  }


  

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';  
  }

}
