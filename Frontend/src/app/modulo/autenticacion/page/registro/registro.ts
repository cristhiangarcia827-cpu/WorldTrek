import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AutenticacionService, RegisterRequest } from '../../service/autenticacion';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html'
})
export class Registro implements OnInit {
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AutenticacionService, private router: Router) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsIguales });
  }

  passwordsIguales(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

registrar() {
  if (this.registroForm.valid) {
    const { username, email, password } = this.registroForm.value;

    const data: RegisterRequest = {
      name: username,
      email: email,
      password: password
    };

    this.authService.register(data).subscribe({
      next: res => {
        this.router.navigate(['/autenticacion/login']);
      },
      error: err => console.error('Error en registro:', err)
    });
  } else {
    this.registroForm.markAllAsTouched();
  }
}
}
