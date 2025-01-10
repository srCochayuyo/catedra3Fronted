import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { LoginComponent } from "./Auth/Pages/login/login.component";
import { ListPostComponent } from "./Post/Pages/list-post/list-post.component";
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "./shared/side-bar/side-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'catedra3Fronted';

  ngOnInit(): void {
    initFlowbite();
  }

  isTokenPresent(): boolean {
    

    return localStorage.getItem('token') !== null;
  }
}
