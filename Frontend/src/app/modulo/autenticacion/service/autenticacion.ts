import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    nombre: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  usuarioActual = signal<AuthResponse | null>(null);

  constructor(private http: HttpClient) {
    let usuario = localStorage.getItem("usuario");

    if (usuario != null) {
      this.usuarioActual.set(JSON.parse(usuario))
    }
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${environment.APIURL}/auth/register`, data);
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.APIURL}/auth/login`, data).pipe(tap(data => {
      localStorage.setItem("usuario", JSON.stringify(data));
      this.usuarioActual.set(data);
    }));
  }

  setUsuario(authData: AuthResponse) {
    this.usuarioActual.set(authData);
    localStorage.setItem('auth', JSON.stringify(authData));
  }

  logout() {
    this.usuarioActual.set(null);
    localStorage.removeItem('auth');
  }
}
