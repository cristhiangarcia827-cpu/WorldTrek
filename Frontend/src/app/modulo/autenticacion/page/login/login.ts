import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionService, LoginRequest, AuthResponse } from '../../service/autenticacion';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const data: LoginRequest = this.loginForm.value;
      
      this.authService.login(data).subscribe({
        next: (res: AuthResponse) => {
          this.router.navigate(['/principal']); // Redirige a dashboard o página principal
        },
        error: (err) => {
          console.error('Error en login:', err);
          this.errorMsg = err?.error?.message || 'Correo o contraseña incorrectos';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
