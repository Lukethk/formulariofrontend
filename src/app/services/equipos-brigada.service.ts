import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brigada } from './brigadas.service';
import { Equipo } from './equipos.service';
import { Categoria } from './categorias.service';
import { environment, API_ENDPOINTS } from '../config/environment';

export interface EquipoBrigada {
  id?: number;
  brigadaId: number;
  brigada?: Brigada;
  equipoId: number;
  equipo?: Equipo;
  cantidad: number;
  fechaAsignacion?: Date;
  activo?: boolean;
  notas?: string;
}

export interface ResumenBrigadas {
  brigadaId: number;
  brigadaNombre: string;
  totalEquipos: number;
  categorias: {
    categoriaId: number;
    categoriaNombre: string;
    cantidad: number;
  }[];
}

export interface ResumenCategorias {
  categoriaId: number;
  categoriaNombre: string;
  totalEquipos: number;
  brigadas: {
    brigadaId: number;
    brigadaNombre: string;
    cantidad: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class EquiposBrigadaService {
  private apiUrl = `${environment.apiUrl}${API_ENDPOINTS.EQUIPOS_BRIGADA}`;

  constructor(private http: HttpClient) { }

  // Obtener todos los equipos por brigada
  getEquiposBrigada(): Observable<EquipoBrigada[]> {
    return this.http.get<EquipoBrigada[]>(this.apiUrl);
  }

  // Actualizar equipo por brigada
  updateEquipoBrigada(id: number, equipoBrigada: EquipoBrigada): Observable<EquipoBrigada> {
    return this.http.put<EquipoBrigada>(`${this.apiUrl}/${id}`, equipoBrigada);
  }

  // Eliminar equipo por brigada
  deleteEquipoBrigada(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Resumen de equipos por brigada
  getResumenBrigadas(): Observable<ResumenBrigadas[]> {
    return this.http.get<ResumenBrigadas[]>(`${this.apiUrl}/resumen/brigadas`);
  }

  // Resumen de equipos por categoría
  getResumenCategorias(): Observable<ResumenCategorias[]> {
    return this.http.get<ResumenCategorias[]>(`${this.apiUrl}/resumen/categorias`);
  }
}
