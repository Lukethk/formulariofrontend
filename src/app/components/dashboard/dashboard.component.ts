import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { BrigadasService, Brigada } from '../../services/brigadas.service';

interface DashboardStats {
  totalFormularios: number;
  formulariosPendientes: number;
  formulariosAprobados: number;
  formulariosRechazados: number;
  ultimaActividad: string;
}

interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  tipo: 'info' | 'success' | 'warning' | 'error';
  fecha: Date;
  leida: boolean;
}

interface MenuItem {
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  badge?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  brigadas: Brigada[] = [];
  
  stats: DashboardStats = {
    totalFormularios: 0,
    formulariosPendientes: 0,
    formulariosAprobados: 0,
    formulariosRechazados: 0,
    ultimaActividad: 'Hace 2 horas'
  };
  
  notificaciones: Notificacion[] = [];
  
  // Menú personalizado según el rol del usuario
  get menuItems(): MenuItem[] {
    const baseItems: MenuItem[] = [
      {
        title: 'Mis Formularios',
        description: 'Revisar y administrar mis formularios existentes',
        icon: '👁️',
        route: '/ver-formularios',
        color: 'bg-green-500',
        badge: this.stats.formulariosPendientes > 0 ? `${this.stats.formulariosPendientes} pendientes` : undefined
      },
      {
        title: 'Mi Perfil',
        description: 'Gestionar información personal y contraseña',
        icon: '👤',
        route: '/perfil',
        color: 'bg-purple-500'
      }
    ];

    // Agregar items según el rol del usuario
    if (this.currentUser?.rol === 'comandante' || this.currentUser?.rol === 'admin') {
      baseItems.push({
        title: 'Reportes de Brigada',
        description: 'Ver estadísticas y reportes de la brigada',
        icon: '📊',
        route: '/reportes',
        color: 'bg-orange-500'
      });
      
      if (this.currentUser?.rol === 'admin') {
        baseItems.push({
          title: 'Administración',
          description: 'Gestionar usuarios y configuraciones del sistema',
          icon: '⚙️',
          route: '/admin',
          color: 'bg-red-500'
        });
      }
    }

    return baseItems;
  }

  constructor(
    private authService: AuthService,
    private brigadasService: BrigadasService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Solo verificar autenticación si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = this.authService.getCurrentUser();
      
      if (!this.currentUser) {
        this.router.navigate(['/login']);
      } else {
        this.loadDashboardData();
        this.loadBrigadas();
      }
    }
  }

  // MÉTODOS DE EMERGENCIA - ACCESO RÁPIDO
  crearFormularioEmergencia(): void {
    // Navegar a formulario de emergencia con prioridad máxima
    this.router.navigate(['/necesidades'], { 
      queryParams: { 
        tipo: 'emergencia',
        prioridad: 'maxima'
      }
    });
  }

  crearFormularioRapido(): void {
    // Navegar a formulario rápido simplificado
    this.router.navigate(['/necesidades'], { 
      queryParams: { 
        tipo: 'rapido',
        modo: 'simplificado'
      }
    });
  }

  verEstadoActual(): void {
    // Navegar a ver formularios con filtro de pendientes
    this.router.navigate(['/ver-formularios'], { 
      queryParams: { 
        estado: 'pendiente',
        prioridad: 'alta'
      }
    });
  }

  private loadDashboardData(): void {
    // Simular carga de datos del dashboard personalizados
    this.loadStats();
    this.loadNotificaciones();
  }

  private loadStats(): void {
    // Estadísticas personalizadas basadas en el usuario logueado
    if (this.currentUser) {
      // Simular datos reales del usuario
      const userId = this.currentUser.id;
      const userRol = this.currentUser.rol;
      const userBrigadaId = this.currentUser.brigada_id;
      
      // Aquí se haría la llamada real al backend para obtener estadísticas del usuario
      // Por ahora simulamos datos personalizados
      this.stats = {
        totalFormularios: this.getFormulariosCountByUser(userId, userRol),
        formulariosPendientes: this.getFormulariosPendientesByUser(userId, userRol),
        formulariosAprobados: this.getFormulariosAprobadosByUser(userId, userRol),
        formulariosRechazados: this.getFormulariosRechazadosByUser(userId, userRol),
        ultimaActividad: this.getUltimaActividadByUser(userId)
      };
    }
  }

  // Métodos para obtener datos específicos del usuario
  private getFormulariosCountByUser(userId: string, userRol: string): number {
    // Simular conteo basado en el rol y brigada del usuario
    if (userRol === 'comandante') {
      return 18; // Formularios de su brigada
    } else if (userRol === 'logistica') {
      return 12; // Formularios que ha procesado
    } else {
      return 8; // Formularios del bombero
    }
  }

  private getFormulariosPendientesByUser(userId: string, userRol: string): number {
    if (userRol === 'comandante') {
      return 5; // Pendientes de su brigada
    } else if (userRol === 'logistica') {
      return 3; // Pendientes de procesar
    } else {
      return 2; // Pendientes del bombero
    }
  }

  private getFormulariosAprobadosByUser(userId: string, userRol: string): number {
    if (userRol === 'comandante') {
      return 10; // Aprobados por él
    } else if (userRol === 'logistica') {
      return 8; // Procesados por él
    } else {
      return 5; // Aprobados del bombero
    }
  }

  private getFormulariosRechazadosByUser(userId: string, userRol: string): number {
    if (userRol === 'comandante') {
      return 3; // Rechazados por él
    } else if (userRol === 'logistica') {
      return 1; // Rechazados por él
    } else {
      return 1; // Rechazados del bombero
    }
  }

  private getUltimaActividadByUser(userId: string): string {
    // Simular última actividad del usuario
    const actividades = [
      'Hace 30 minutos',
      'Hace 1 hora',
      'Hace 2 horas',
      'Hace 4 horas',
      'Hace 1 día'
    ];
    return actividades[Math.floor(Math.random() * actividades.length)];
  }

  private loadBrigadas(): void {
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

  private loadNotificaciones(): void {
    // Notificaciones específicas del usuario logueado
    if (this.currentUser) {
      const userId = this.currentUser.id;
      const userRol = this.currentUser.rol;
      const userBrigadaId = this.currentUser.brigada_id;
      
      const notificacionesUsuario: Notificacion[] = [];
      
      // Notificaciones según el rol del usuario
      if (userRol === 'bombero') {
        notificacionesUsuario.push(
          {
            id: '1',
            titulo: 'Formulario Aprobado',
            mensaje: `Tu formulario #BP-${userId.slice(-4)} ha sido aprobado por el comandante`,
            tipo: 'success',
            fecha: new Date(Date.now() - 2 * 60 * 60 * 1000),
            leida: false
          },
          {
            id: '2',
            titulo: 'Equipamiento Asignado',
            mensaje: 'Se ha asignado nuevo equipamiento a tu brigada',
            tipo: 'info',
            fecha: new Date(Date.now() - 24 * 60 * 60 * 1000),
            leida: true
          }
        );
      } else if (userRol === 'comandante') {
        notificacionesUsuario.push(
          {
            id: '1',
            titulo: 'Nuevo Formulario Pendiente',
            mensaje: `Formulario #BP-${Date.now().toString().slice(-6)} de tu brigada requiere revisión`,
            tipo: 'warning',
            fecha: new Date(Date.now() - 1 * 60 * 60 * 1000),
            leida: false
          },
          {
            id: '2',
            titulo: 'Formulario Aprobado',
            mensaje: 'Has aprobado un formulario de tu brigada',
            tipo: 'success',
            fecha: new Date(Date.now() - 3 * 60 * 60 * 1000),
            leida: true
          }
        );
      } else if (userRol === 'logistica') {
        notificacionesUsuario.push(
          {
            id: '1',
            titulo: 'Nuevo Pedido Procesado',
            mensaje: 'Se ha procesado un nuevo pedido de equipamiento',
            tipo: 'info',
            fecha: new Date(Date.now() - 2 * 60 * 60 * 1000),
            leida: false
          },
          {
            id: '2',
            titulo: 'Inventario Actualizado',
            mensaje: 'El inventario de tu área ha sido actualizado',
            tipo: 'success',
            fecha: new Date(Date.now() - 6 * 60 * 60 * 1000),
            leida: true
          }
        );
      }

      this.notificaciones = notificacionesUsuario;
    }
  }

  logout(): void {
    this.authService.logout();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  getRolDisplayName(rol: string): string {
    const rolNames: { [key: string]: string } = {
      'bombero': 'Bombero',
      'comandante': 'Comandante',
      'logistica': 'Logística',
      'admin': 'Administrador'
    };
    return rolNames[rol] || rol;
  }

  getBrigadaNombre(brigadaId: string | undefined | null): string {
    if (!brigadaId) return 'Sin brigada';
    const brigada = this.brigadas.find(b => b.id === brigadaId);
    return brigada ? brigada.nombre : 'Brigada no encontrada';
  }

  marcarNotificacionComoLeida(notificacion: Notificacion): void {
    notificacion.leida = true;
  }

  eliminarNotificacion(id: string): void {
    this.notificaciones = this.notificaciones.filter(n => n.id !== id);
  }

  getNotificacionesNoLeidas(): number {
    return this.notificaciones.filter(n => !n.leida).length;
  }

  getPorcentajeAprobacion(): number {
    if (this.stats.totalFormularios === 0) return 0;
    return Math.round((this.stats.formulariosAprobados / this.stats.totalFormularios) * 100);
  }

  getPorcentajePendientes(): number {
    if (this.stats.totalFormularios === 0) return 0;
    return Math.round((this.stats.formulariosPendientes / this.stats.totalFormularios) * 100);
  }

  getPorcentajeAprobados(): number {
    if (this.stats.totalFormularios === 0) return 0;
    return Math.round((this.stats.formulariosAprobados / this.stats.totalFormularios) * 100);
  }

  getColorPorTipo(tipo: string): string {
    const colors = {
      'info': 'text-blue-600 bg-blue-100',
      'success': 'text-green-600 bg-green-100',
      'warning': 'text-yellow-600 bg-yellow-100',
      'error': 'text-red-600 bg-red-100'
    };
    return colors[tipo as keyof typeof colors] || colors.info;
  }

  getIconoPorTipo(tipo: string): string {
    const iconos = {
      'info': 'ℹ️',
      'success': '✅',
      'warning': '⚠️',
      'error': '❌'
    };
    return iconos[tipo as keyof typeof iconos] || iconos.info;
  }

  mostrarProximamente(funcionalidad: string): void {
    // Crear una notificación temporal con animación
    const notificacion = {
      id: Date.now().toString(),
      titulo: '🚀 Próximamente',
      mensaje: `${funcionalidad} estará disponible en una próxima actualización`,
      tipo: 'info' as const,
      fecha: new Date(),
      leida: false
    };
    
    // Agregar al inicio del array de notificaciones
    this.notificaciones.unshift(notificacion);
    
    // Auto-remover después de 4 segundos con animación
    setTimeout(() => {
      // Marcar para animación de salida
      const elemento = document.querySelector(`[data-notificacion-id="${notificacion.id}"]`);
      if (elemento) {
        elemento.classList.add('removing');
        // Esperar a que termine la animación antes de remover
        setTimeout(() => {
          this.notificaciones = this.notificaciones.filter(n => n.id !== notificacion.id);
        }, 400); // Duración de la animación slideOutToTop
      } else {
        // Fallback si no se encuentra el elemento
        this.notificaciones = this.notificaciones.filter(n => n.id !== notificacion.id);
      }
    }, 4000);
  }
}
