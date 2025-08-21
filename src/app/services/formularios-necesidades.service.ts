import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface FormularioNecesidad {
  id: string;
  brigada_id: string;
  fecha_solicitud: string;
  estado: string;
  prioridad: string;
  descripcion: string;
  items_solicitados: ItemSolicitado[];
  solicitante_id: string;
  fecha_aprobacion?: string;
  aprobado_por?: string;
  observaciones?: string;
}

export interface ItemSolicitado {
  id: string;
  categoria_id: string;
  equipo_id: string;
  cantidad_solicitada: number;
  cantidad_aprobada?: number;
  justificacion: string;
  prioridad: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormulariosNecesidadesService {
  
  // Datos mock para emergencia
  private mockFormularios: FormularioNecesidad[] = [
    {
      id: '1',
      brigada_id: '1',
      fecha_solicitud: '2024-12-15',
      estado: 'pendiente',
      prioridad: 'alta',
      descripcion: 'Necesitamos equipos de protección personal',
      items_solicitados: [
        {
          id: '1',
          categoria_id: '1',
          equipo_id: '1',
          cantidad_solicitada: 10,
          justificacion: 'Equipos desgastados por uso intensivo',
          prioridad: 'alta'
        }
      ],
      solicitante_id: '2'
    },
    {
      id: '2',
      brigada_id: '2',
      fecha_solicitud: '2024-12-14',
      estado: 'aprobado',
      prioridad: 'media',
      descripcion: 'Reposición de herramientas básicas',
      items_solicitados: [
        {
          id: '2',
          categoria_id: '2',
          equipo_id: '3',
          cantidad_solicitada: 5,
          cantidad_aprobada: 5,
          justificacion: 'Herramientas perdidas en último incendio',
          prioridad: 'media'
        }
      ],
      solicitante_id: '3',
      fecha_aprobacion: '2024-12-15',
      aprobado_por: '1'
    }
  ];

  constructor() { }

  getFormularios(): Observable<FormularioNecesidad[]> {
    return of(this.mockFormularios);
  }

  getFormularioById(id: string): Observable<FormularioNecesidad | null> {
    const formulario = this.mockFormularios.find(f => f.id === id);
    return of(formulario || null);
  }

  getFormulariosByBrigada(brigadaId: string): Observable<FormularioNecesidad[]> {
    const formularios = this.mockFormularios.filter(f => f.brigada_id === brigadaId);
    return of(formularios);
  }

  createFormulario(formulario: Omit<FormularioNecesidad, 'id' | 'fecha_solicitud'>): Observable<FormularioNecesidad> {
    const newFormulario: FormularioNecesidad = {
      ...formulario,
      id: (this.mockFormularios.length + 1).toString(),
      fecha_solicitud: new Date().toISOString().split('T')[0]
    };
    this.mockFormularios.push(newFormulario);
    return of(newFormulario);
  }

  updateFormulario(id: string, formulario: Partial<FormularioNecesidad>): Observable<FormularioNecesidad | null> {
    const index = this.mockFormularios.findIndex(f => f.id === id);
    if (index !== -1) {
      this.mockFormularios[index] = { ...this.mockFormularios[index], ...formulario };
      return of(this.mockFormularios[index]);
    }
    return of(null);
  }

  deleteFormulario(id: string): Observable<boolean> {
    const index = this.mockFormularios.findIndex(f => f.id === id);
    if (index !== -1) {
      this.mockFormularios.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  aprobarFormulario(id: string, aprobadoPor: string, observaciones?: string): Observable<FormularioNecesidad | null> {
    const index = this.mockFormularios.findIndex(f => f.id === id);
    if (index !== -1) {
      this.mockFormularios[index] = {
        ...this.mockFormularios[index],
        estado: 'aprobado',
        fecha_aprobacion: new Date().toISOString().split('T')[0],
        aprobado_por: aprobadoPor,
        observaciones: observaciones
      };
      return of(this.mockFormularios[index]);
    }
    return of(null);
  }

  rechazarFormulario(id: string, observaciones: string): Observable<FormularioNecesidad | null> {
    const index = this.mockFormularios.findIndex(f => f.id === id);
    if (index !== -1) {
      this.mockFormularios[index] = {
        ...this.mockFormularios[index],
        estado: 'rechazado',
        observaciones: observaciones
      };
      return of(this.mockFormularios[index]);
    }
    return of(null);
  }
}


