import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Viaje, ViajesService } from '../../service/viaje';
import { AutenticacionService } from '../../../autenticacion/service/autenticacion';

@Component({
  selector: 'nuevo-viaje',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nuevoviaje.html'
})
export class NuevoViaje implements OnChanges {
  @Input() viajeEditar?: Viaje;
  @Output() ngSubmit = new EventEmitter<void>();

  viajeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private viajesService: ViajesService,
    private authService: AutenticacionService
  ) {
    this.viajeForm = this.fb.group({
      titulo: ['', Validators.required],
      paisdestino: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      descripcion: [''],
      estado: [this.viajeEditar ? this.viajeEditar.estado : 'Planificado', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['viajeEditar'] && this.viajeEditar) {
      this.viajeForm.patchValue({
        titulo: this.viajeEditar.titulo,
        paisdestino: this.viajeEditar.paisDestino,
        fechaInicio: this.formatDate(this.viajeEditar.fechaInicio),
        fechaFin: this.formatDate(this.viajeEditar.fechaFin),
        descripcion: this.viajeEditar.descripcion,
        estado: this.viajeEditar.estado
      });
    }
  }
  guardarViaje(): void {
    if (this.viajeForm.invalid) return;

    const usuario = this.authService.usuarioActual();
    if (!usuario) {
      alert('Debes iniciar sesión para guardar el viaje');
      return;
    }

    const viaje: Viaje = {
      id: this.viajeEditar?.id,
      usuarioId: usuario.user.id,
      titulo: this.viajeForm.value.titulo,
      paisDestino: this.viajeForm.value.paisdestino,
      fechaInicio: new Date(this.viajeForm.value.fechaInicio),
      fechaFin: new Date(this.viajeForm.value.fechaFin),
      descripcion: this.viajeForm.value.descripcion,
      estado: this.viajeEditar ? this.viajeForm.value.estado : 'Planificado'
    };

    if (this.viajeEditar?.id) {
      this.viajesService.actualizarViaje(this.viajeEditar.id, viaje);
      alert('Viaje actualizado correctamente');
    } else {
      this.viajesService.crearViaje(viaje);
      alert('Viaje creado correctamente');
    }

    this.ngSubmit.emit();
  }

  private formatDate(fecha: Date | string): string {
    const d = new Date(fecha);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  }
}

