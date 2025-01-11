import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../Service/post.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'postear',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  providers: [PostService],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  postForm!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  postAlert: boolean = true;
  successMessage: string = "";
  imagePreview: string | ArrayBuffer | null = null; 

  private postService = inject(PostService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.formulario();
  }

  formulario() {
    this.postForm = this.fb.group({
      titulo: ['', [Validators.required]],
      image: [null, Validators.required], // Archivo requerido
    });
  }

  get tituloValidate() {
    return this.postForm.get('titulo')?.invalid && this.postForm.get('titulo')?.touched;
  }

  get imageValidate() {
    return this.postForm.get('image')?.invalid && this.postForm.get('image')?.touched;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.postForm.patchValue({ image: file });
      this.postForm.get('image')?.markAsTouched();

      // Generar vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; 
      };
      reader.readAsDataURL(file);
    }
  }

  Postear() {
    if (this.postForm.invalid) {
      Object.values(this.postForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
      return;
    }

    const formData = new FormData();
    formData.append('titulo', this.postForm.get('titulo')?.value);
    formData.append('image', this.postForm.get('image')?.value);

    this.postService.Postear(formData).subscribe({
      next: (response) => {
        this.error = false;
        this.postAlert = true;
        this.successMessage = 'Post creado con éxito.';
      },
      error: (error) => {
        this.error = true;
        this.postAlert = false;
        this.errorMessage = error.message;
        console.log('Error del backend:', this.errorMessage);
      }
    });
  }

  toLogin() {
    this.router.navigate(['']);
  }
}
