import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, API_ENDPOINTS } from '../config/environment';

export interface Talla {
  id?: number;
  nombre: string;
  tipo: string;
  descripcion?: string;
  activa?: boolean;
  orden?: number;
}

export interface TipoTalla {
  id: string;
  nombre: string;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TallasService {
  private apiUrl = `${environment.apiUrl}${API_ENDPOINTS.TALLAS}`;

  constructor(private http: HttpClient) { }

  // Obtener todas las tallas
  getTallas(): Observable<Talla[]> {
    return this.http.get<Talla[]>(this.apiUrl);
  }

  // Obtener talla por ID
  getTallaById(id: number): Observable<Talla> {
    return this.http.get<Talla>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva talla
  createTalla(talla: Talla): Observable<Talla> {
    return this.http.post<Talla>(this.apiUrl, talla);
  }

  // Actualizar talla
  updateTalla(id: number, talla: Talla): Observable<Talla> {
    return this.http.put<Talla>(`${this.apiUrl}/${id}`, talla);
  }

  // Eliminar talla
  deleteTalla(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Buscar tallas por nombre
  searchTallas(nombre: string): Observable<Talla[]> {
    return this.http.get<Talla[]>(`${this.apiUrl}/search/${nombre}`);
  }

  // Obtener tallas por tipo
  getTallasByTipo(tipo: string): Observable<Talla[]> {
    return this.http.get<Talla[]>(`${this.apiUrl}/tipo/${tipo}`);
  }

  // Obtener tipos de tallas disponibles
  getTiposDisponibles(): Observable<TipoTalla[]> {
    return this.http.get<TipoTalla[]>(`${this.apiUrl}/tipos/disponibles`);
  }
}
