import { Component } from '@angular/core';
import { SideBarComponent } from "../../../shared/side-bar/side-bar.component";
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../Auth/Service/auth.service';
import { PostService } from '../../../Post/Service/post.service';

@Component({
  selector: 'app-router',
  standalone: true,
  imports: [SideBarComponent,RouterOutlet],
  providers:[AuthService,PostService],
  templateUrl: './router.component.html',
  styleUrl: './router.component.css'
})
export class RouterComponent {

}
