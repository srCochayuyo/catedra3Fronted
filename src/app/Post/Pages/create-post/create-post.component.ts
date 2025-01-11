import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../Service/post.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'postear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [PostService],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  postForm!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  postAlert: boolean = false;
  successMessage: string = "";
  imagePreview: string | ArrayBuffer | null = null;
  isDragOver = false;
  isLoading: boolean = false;


  private postService = inject(PostService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.formulario();
  }

  ngOnInit(): void {
    console.log(this.router.config)
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

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); 
    this.isDragOver = true;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.postForm.patchValue({ image: file });
      this.postForm.get('image')?.markAsTouched();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onDragLeave(event: DragEvent) {
    this.isDragOver = false;
  }

  Postear() {
    if (this.postForm.invalid) {
      Object.values(this.postForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('titulo', this.postForm.get('titulo')?.value);
    formData.append('image', this.postForm.get('image')?.value);

    this.postService.Postear(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.error = false;
        this.postAlert = true;
        this.successMessage = 'Post creado con éxito.';

        this.postForm.reset();
        this.imagePreview = null;
      },
      error: (error) => {
        this.error = true;
        this.postAlert = false;
        this.errorMessage = error.message;
        console.log('Error del backend:', this.errorMessage);

        
        this.imagePreview = null;
        this.postForm.get('image')?.reset(); 
      }
    });
  }

  Prev() {
    this.router.navigate(['User/']);
  }
}
