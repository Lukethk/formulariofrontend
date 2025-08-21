import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { BrigadasService, Brigada } from '../../services/brigadas.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  currentUser: User | null = null;
  brigadas: Brigada[] = [];
  perfilForm: FormGroup;
  passwordForm: FormGroup;
  loading = false;
  mensaje = '';
  tipoMensaje: 'success' | 'error' | 'info' = 'info';
  
  // Estados de los formularios
  editandoPerfil = false;
  editandoPassword = false;

  constructor(
    private authService: AuthService,
    private brigadasService: BrigadasService,
    private router: Router,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.perfilForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      numero_legajo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      brigada_id: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      password_actual: ['', [Validators.required, Validators.minLength(6)]],
      password_nuevo: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmar: ['', [Validators.required, Validators.minLength(6)]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = this.authService.getCurrentUser();
      
      if (!this.currentUser) {
        this.router.navigate(['/login']);
      } else {
        this.loadBrigadas();
        this.cargarDatosUsuario();
      }
    }
  }

  private cargarDatosUsuario(): void {
    if (this.currentUser) {
      this.perfilForm.patchValue({
        nombre: this.currentUser.nombre,
        email: this.currentUser.email,
        numero_legajo: this.currentUser.numero_legajo || '',
        brigada_id: this.currentUser.brigada_id || ''
      });
    }
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
        this.mostrarMensaje('Error al cargar las brigadas', 'error');
      }
    });
  }

  editarPerfil(): void {
    this.editandoPerfil = true;
    this.mensaje = '';
  }

  cancelarEdicionPerfil(): void {
    this.editandoPerfil = false;
    this.cargarDatosUsuario();
    this.mensaje = '';
  }

  guardarPerfil(): void {
    if (this.perfilForm.valid && this.currentUser) {
      this.loading = true;
      const datosActualizados = this.perfilForm.value;
      
      // Aquí se haría la llamada al backend para actualizar el perfil
      // Por ahora simulamos la actualización
      setTimeout(() => {
        if (this.currentUser) {
          const usuarioActualizado: User = {
            ...this.currentUser,
            ...datosActualizados
          };
          
          // Actualizar en el servicio de autenticación
          this.authService.updateCurrentUser(usuarioActualizado);
          
          // Actualizar la referencia local
          this.currentUser = usuarioActualizado;
          
          this.editandoPerfil = false;
          this.loading = false;
          this.mostrarMensaje('Perfil actualizado correctamente', 'success');
        }
      }, 1000);
    } else {
      this.mostrarMensaje('Por favor, completa todos los campos correctamente', 'error');
    }
  }

  editarPassword(): void {
    this.editandoPassword = true;
    this.passwordForm.reset();
    this.mensaje = '';
  }

  cancelarEdicionPassword(): void {
    this.editandoPassword = false;
    this.passwordForm.reset();
    this.mensaje = '';
  }

  cambiarPassword(): void {
    if (this.passwordForm.valid) {
      const { password_actual, password_nuevo } = this.passwordForm.value;
      
      // Aquí se haría la llamada al backend para cambiar la contraseña
      // Por ahora simulamos el cambio
      this.loading = true;
      
      setTimeout(() => {
        this.loading = false;
        this.editandoPassword = false;
        this.passwordForm.reset();
        this.mostrarMensaje('Contraseña cambiada correctamente', 'success');
      }, 1000);
    } else {
      this.mostrarMensaje('Por favor, completa todos los campos correctamente', 'error');
    }
  }

  private passwordMatchValidator(group: FormGroup): {[key: string]: any} | null {
    const password = group.get('password_nuevo');
    const confirmPassword = group.get('password_confirmar');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    
    return null;
  }

  private mostrarMensaje(mensaje: string, tipo: 'success' | 'error' | 'info'): void {
    this.mensaje = mensaje;
    this.tipoMensaje = tipo;
    
    // Auto-ocultar mensajes de éxito después de 5 segundos
    if (tipo === 'success') {
      setTimeout(() => {
        this.mensaje = '';
      }, 5000);
    }
  }

  volverAlDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  getBrigadaNombre(brigadaId: string | undefined | null): string {
    if (!brigadaId) return 'Sin brigada';
    const brigada = this.brigadas.find(b => b.id === brigadaId);
    return brigada ? brigada.nombre : 'Brigada no encontrada';
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
}
