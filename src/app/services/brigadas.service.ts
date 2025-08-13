import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, API_ENDPOINTS } from '../config/environment';

export interface Brigada {
  id?: number;
  nombre: string;
  descripcion?: string;
  ubicacion?: string;
  capacidad?: number;
  activa?: boolean;
  fechaCreacion?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BrigadasService {
  private apiUrl = `${environment.apiUrl}${API_ENDPOINTS.BRIGADAS}`;

  constructor(private http: HttpClient) { }

  // Obtener todas las brigadas
  getBrigadas(): Observable<Brigada[]> {
    return this.http.get<Brigada[]>(this.apiUrl);
  }

  // Obtener brigada por ID
  getBrigadaById(id: number): Observable<Brigada> {
    return this.http.get<Brigada>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva brigada
  createBrigada(brigada: Brigada): Observable<Brigada> {
    return this.http.post<Brigada>(this.apiUrl, brigada);
  }

  // Actualizar brigada
  updateBrigada(id: number, brigada: Brigada): Observable<Brigada> {
    return this.http.put<Brigada>(`${this.apiUrl}/${id}`, brigada);
  }

  // Eliminar brigada
  deleteBrigada(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Buscar brigadas por nombre
  searchBrigadas(nombre: string): Observable<Brigada[]> {
    return this.http.get<Brigada[]>(`${this.apiUrl}/search/${nombre}`);
  }
}
