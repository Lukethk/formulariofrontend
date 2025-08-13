import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from './equipos.service';
import { environment, API_ENDPOINTS } from '../config/environment';

export interface Categoria {
  id?: number;
  nombre: string;
  descripcion?: string;
  tipo?: string;
  activa?: boolean;
  fechaCreacion?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = `${environment.apiUrl}${API_ENDPOINTS.CATEGORIAS}`;

  constructor(private http: HttpClient) { }

  // Obtener todas las categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  // Obtener categoría por ID
  getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva categoría
  createCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  // Actualizar categoría
  updateCategoria(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria);
  }

  // Eliminar categoría
  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Buscar categorías por nombre
  searchCategorias(nombre: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/search/${nombre}`);
  }

  // Obtener equipos de una categoría
  getEquiposByCategoria(id: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.apiUrl}/${id}/equipos`);
  }
}
