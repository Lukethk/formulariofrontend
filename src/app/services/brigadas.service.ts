import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Brigada {
  id: string;
  nombre: string;
  ubicacion: string;
  activo: boolean;
  fecha_creacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class BrigadasService {
  
  // Datos mock para emergencia
  private mockBrigadas: Brigada[] = [
    {
      id: '1',
      nombre: 'Brigada Central',
      ubicacion: 'Centro de la ciudad',
      activo: true,
      fecha_creacion: '2024-01-01'
    },
    {
      id: '2',
      nombre: 'Brigada Norte',
      ubicacion: 'Zona norte',
      activo: true,
      fecha_creacion: '2024-01-15'
    },
    {
      id: '3',
      nombre: 'Brigada Sur',
      ubicacion: 'Zona sur',
      activo: true,
      fecha_creacion: '2024-02-01'
    }
  ];

  constructor() { }

  getBrigadas(): Observable<Brigada[]> {
    return of(this.mockBrigadas);
  }

  getBrigadaById(id: string): Observable<Brigada | null> {
    const brigada = this.mockBrigadas.find(b => b.id === id);
    return of(brigada || null);
  }

  createBrigada(brigada: Omit<Brigada, 'id' | 'fecha_creacion'>): Observable<Brigada> {
    const newBrigada: Brigada = {
      ...brigada,
      id: (this.mockBrigadas.length + 1).toString(),
      fecha_creacion: new Date().toISOString().split('T')[0]
    };
    this.mockBrigadas.push(newBrigada);
    return of(newBrigada);
  }

  updateBrigada(id: string, brigada: Partial<Brigada>): Observable<Brigada | null> {
    const index = this.mockBrigadas.findIndex(b => b.id === id);
    if (index !== -1) {
      this.mockBrigadas[index] = { ...this.mockBrigadas[index], ...brigada };
      return of(this.mockBrigadas[index]);
    }
    return of(null);
  }

  deleteBrigada(id: string): Observable<boolean> {
    const index = this.mockBrigadas.findIndex(b => b.id === id);
    if (index !== -1) {
      this.mockBrigadas.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
