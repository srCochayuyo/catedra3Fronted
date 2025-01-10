import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  loginAlert: boolean = true;
  successMessage: string = "";

  private authService = inject(AuthService)

  constructor(private fb: FormBuilder, private router: Router) {
    this.formulario();
  }

  formulario()
  {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required]
    });
  } 

  get emailValidate() 
  {
    return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched;
  }

  get passwordValidate()
  {
    return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched;
  }

 
  login() {
    if(this.loginForm.invalid){
      Object.values(this.loginForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
  
      return;
    }
  
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if(response.token) {

          this.error = false;
          this.loginAlert = true;
          this.successMessage = "Sesión iniciada con éxito.";

          //navegar a los posts
  
        } else {
          console.log('Error en login');
          this.error = true;
        }
  
      },
      error: (error) => {
        this.error = true;
        this.loginAlert = false;
        
        this.errorMessage = error.message;
    
        console.log('Error del backend:', this.errorMessage);
    }
    });
  }



}
