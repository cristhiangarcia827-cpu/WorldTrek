import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutenticacionService } from '../../service/autenticacion';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit {
  perfilForm!: FormGroup;
  mensaje: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AutenticacionService
  ) {}

  ngOnInit(): void {
    const usuario = this.authService.usuarioActual();
    this.perfilForm = this.fb.group({
      name: [usuario?.user.nombre || '', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.minLength(6)]]
    });
  }

  guardarCambios() {
    if (this.perfilForm.invalid) {
      this.mensaje = 'Por favor completa los campos correctamente.';
      return;
    }

    const usuario = this.authService.usuarioActual();
    if (!usuario) {
      this.mensaje = 'No hay usuario autenticado.';
      return;
    }

    const userId = usuario.user.id;
    const { name, password } = this.perfilForm.value;

    this.authService.updateUser(userId, { name, password }).subscribe({
      next: (res) => {
        this.mensaje = res.message;
      },
      error: (err) => {
        this.mensaje = err.error?.message || 'Error al actualizar perfil.';
      }
    });
  }
}

