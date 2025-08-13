import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, API_ENDPOINTS } from '../config/environment';

export interface Equipo {
  id?: number;
  nombre: string;
  descripcion?: string;
  categoriaId: number;
  categoria?: Categoria;
  marca?: string;
  modelo?: string;
  serial?: string;
  estado?: string;
  fechaAdquisicion?: Date;
  fechaMantenimiento?: Date;
  activo?: boolean;
}

export interface Categoria {
  id?: number;
  nombre: string;
  descripcion?: string;
  tipo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private apiUrl = `${environment.apiUrl}${API_ENDPOINTS.EQUIPOS}`;

  constructor(private http: HttpClient) { }

  // Obtener todos los equipos
  getEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.apiUrl);
  }

  // Obtener equipo por ID
  getEquipoById(id: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo equipo
  createEquipo(equipo: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.apiUrl, equipo);
  }

  // Actualizar equipo
  updateEquipo(id: number, equipo: Equipo): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.apiUrl}/${id}`, equipo);
  }

  // Eliminar equipo
  deleteEquipo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Buscar equipos por nombre
  searchEquipos(nombre: string): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.apiUrl}/search/${nombre}`);
  }

  // Obtener equipos por categoría
  getEquiposByCategoria(categoriaId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.apiUrl}/categoria/${categoriaId}`);
  }
}
