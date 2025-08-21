import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrigadasService, Brigada } from '../../services/brigadas.service';

interface Formulario {
  id: string;
  brigada_id: string;
  fecha_creacion: Date;
  estado: string;
  solicitante_nombre?: string;
  epp_ropa?: { [key: string]: number };
  epp_botas?: { [key: string]: number };
  herramientas?: { [key: string]: number };
}

@Component({
  selector: 'app-ver-formularios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-formularios.component.html',
  styleUrls: ['./ver-formularios.component.css']
})
export class VerFormulariosComponent implements OnInit {
  formularios: Formulario[] = [];
  brigadas: Brigada[] = [];
  loading = false;
  
  // Filtros
  filtroEstado = '';
  filtroBrigada = '';
  busquedaId = '';
  
  // Paginación
  paginaActual = 1;
  elementosPorPagina = 10;
  totalFormularios = 0;
  totalPaginas = 1;
  
  // Detalles del formulario
  formularioSeleccionado: Formulario | null = null;
  mostrarDetalle = false;
  
  // Math para usar en el template
  Math = Math;

  constructor(
    private brigadasService: BrigadasService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarBrigadas();
      this.cargarFormularios();
    }
  }

  cargarBrigadas(): void {
    this.brigadasService.getBrigadas().subscribe({
      next: (response) => {
        if (response && response.success) {
          this.brigadas = response.data || [];
        }
      },
      error: (error) => {
        console.error('Error cargando brigadas:', error);
      }
    });
  }

  cargarFormularios(): void {
    this.loading = true;
    
    // Simular carga de formularios (aquí se conectaría con el backend real)
    setTimeout(() => {
      this.formularios = [
        {
          id: 'BP-2024-001',
          brigada_id: '1',
          fecha_creacion: new Date('2024-01-15'),
          estado: 'aprobado',
          solicitante_nombre: 'Juan Pérez',
          epp_ropa: { casco: 5, chaqueta: 10 },
          epp_botas: { talla_42: 8, talla_43: 12 },
          herramientas: { hacha: 3, manguera: 15 }
        },
        {
          id: 'BP-2024-002',
          brigada_id: '2',
          fecha_creacion: new Date('2024-01-20'),
          estado: 'pendiente',
          solicitante_nombre: 'María García',
          epp_ropa: { casco: 3, chaqueta: 8 },
          epp_botas: { talla_41: 5, talla_42: 10 },
          herramientas: { hacha: 2, manguera: 12 }
        },
        {
          id: 'BP-2024-003',
          brigada_id: '1',
          fecha_creacion: new Date('2024-01-25'),
          estado: 'en_revision',
          solicitante_nombre: 'Carlos López',
          epp_ropa: { casco: 4, chaqueta: 7 },
          epp_botas: { talla_43: 6, talla_44: 8 },
          herramientas: { hacha: 1, manguera: 8 }
        }
      ];
      
      this.totalFormularios = this.formularios.length;
      this.totalPaginas = Math.ceil(this.totalFormularios / this.elementosPorPagina);
      this.loading = false;
    }, 1000);
  }

  aplicarFiltros(): void {
    this.paginaActual = 1;
    // Aquí se aplicarían los filtros reales al backend
    console.log('Aplicando filtros:', {
      estado: this.filtroEstado,
      brigada: this.filtroBrigada,
      busqueda: this.busquedaId
    });
  }

  limpiarFiltros(): void {
    this.filtroEstado = '';
    this.filtroBrigada = '';
    this.busquedaId = '';
    this.paginaActual = 1;
    this.cargarFormularios();
  }

  crearNuevoFormulario(): void {
    this.router.navigate(['/necesidades']);
  }

  verDetalle(id: string): void {
    this.formularioSeleccionado = this.formularios.find(f => f.id === id) || null;
    this.mostrarDetalle = true;
  }

  cerrarDetalle(): void {
    this.mostrarDetalle = false;
    this.formularioSeleccionado = null;
  }

  editarFormulario(id: string): void {
    console.log('Editar formulario:', id);
    // Aquí se implementaría la lógica para editar
  }

  eliminarFormulario(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este formulario?')) {
      console.log('Eliminar formulario:', id);
      // Aquí se implementaría la lógica para eliminar
      this.formularios = this.formularios.filter(f => f.id !== id);
      this.totalFormularios = this.formularios.length;
      this.totalPaginas = Math.ceil(this.totalFormularios / this.elementosPorPagina);
    }
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  getEstadoClass(estado: string): string {
    const clases = {
      'pendiente': 'bg-yellow-100 text-yellow-800',
      'en_revision': 'bg-blue-100 text-blue-800',
      'aprobado': 'bg-green-100 text-green-800',
      'rechazado': 'bg-red-100 text-red-800',
      'en_proceso': 'bg-purple-100 text-purple-800',
      'completado': 'bg-gray-100 text-gray-800'
    };
    return clases[estado as keyof typeof clases] || clases.pendiente;
  }

  getEstadoDisplayName(estado: string): string {
    const nombres = {
      'pendiente': 'Pendiente',
      'en_revision': 'En Revisión',
      'aprobado': 'Aprobado',
      'rechazado': 'Rechazado',
      'en_proceso': 'En Proceso',
      'completado': 'Completado'
    };
    return nombres[estado as keyof typeof nombres] || estado;
  }

  getBrigadaNombre(brigadaId: string): string {
    const brigada = this.brigadas.find(b => b.id === brigadaId);
    return brigada ? brigada.nombre : 'Brigada no encontrada';
  }

  getTotalItems(categoria: { [key: string]: number }): number {
    return Object.values(categoria).reduce((total, cantidad) => total + cantidad, 0);
  }

  getItemsFromCategory(categoria: { [key: string]: number }): Array<{nombre: string, cantidad: number}> {
    return Object.entries(categoria).map(([nombre, cantidad]) => ({
      nombre: this.formatItemName(nombre),
      cantidad: cantidad
    }));
  }

  formatItemName(nombre: string): string {
    // Convertir nombres de propiedades en nombres legibles
    const nombres = {
      'casco': 'Casco',
      'chaqueta': 'Chaqueta',
      'talla_42': 'Talla 42',
      'talla_43': 'Talla 43',
      'talla_41': 'Talla 41',
      'hacha': 'Hacha',
      'manguera': 'Manguera'
    };
    return nombres[nombre as keyof typeof nombres] || nombre;
  }
}
