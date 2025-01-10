import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  loginForm!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  registerlert: boolean = true;
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
  
   
  Register() {
    if(this.loginForm.invalid){
      Object.values(this.loginForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    
      return;
    }
    
    this.authService.register(this.loginForm.value).subscribe({
      next: (response) => {
    
        this.error = false;
        this.registerlert = true;
        this.successMessage = "Registro Existoso.";       
    
      },
      error: (error) => {
        this.error = true;
        this.registerlert = false;
          
        this.errorMessage = error.message;
      
        console.log('Error del backend:', this.errorMessage);
    }
    });
  }

  toLogin()
  {
    this.router.navigate(['']);
  }
  

}
