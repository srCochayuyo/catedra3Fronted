import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../../Auth/Service/local-storage.service';
import {  Router, RouterModule } from '@angular/router';

@Component({
  selector: 'sideBar',
  standalone: true,
  imports: [CommonModule],
  providers:[LocalStorageService],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {


  private localStorge = inject(LocalStorageService)
 

  constructor(private router: Router) {}

    


  toPostear()
  {
    this.router.navigate(['/User/Postear'])
  } 



  async logOut()
  {
    this.localStorge.removeVariable('token');
    this.router.navigate(['/'])
  }

}
