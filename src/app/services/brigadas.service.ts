import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, API_ENDPOINTS } from '../config/environment';

export interface Brigada {
  id?: string;
  nombre: string;
  cantidad_bomberos_activos?: number;
  contacto_comandante?: string;
  encargado_logistica?: string;
  contacto_logistica?: string;
  numero_emergencia_publico?: string;
  region?: string;
  activa?: boolean;
  fecha_creacion?: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class BrigadasService {
  private apiUrl = `${environment.apiUrl}${API_ENDPOINTS.BRIGADAS}`;

  constructor(private http: HttpClient) { }

  // Obtener todas las brigadas
  getBrigadas(): Observable<ApiResponse<Brigada[]>> {
    return this.http.get<ApiResponse<Brigada[]>>(this.apiUrl);
  }

  // Obtener brigada por ID
  getBrigadaById(id: string): Observable<ApiResponse<Brigada>> {
    return this.http.get<ApiResponse<Brigada>>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva brigada
  createBrigada(brigada: Brigada): Observable<ApiResponse<Brigada>> {
    return this.http.post<ApiResponse<Brigada>>(this.apiUrl, brigada);
  }

  // Actualizar brigada
  updateBrigada(id: string, brigada: Brigada): Observable<ApiResponse<Brigada>> {
    return this.http.put<ApiResponse<Brigada>>(`${this.apiUrl}/${id}`, brigada);
  }

  // Eliminar brigada
  deleteBrigada(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }

  // Buscar brigadas por nombre
  searchBrigadas(nombre: string): Observable<ApiResponse<Brigada[]>> {
    return this.http.get<ApiResponse<Brigada[]>>(`${this.apiUrl}/search?nombre=${nombre}`);
  }
}
