import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BrigadasService } from '../../services/brigadas.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  showConfirmPassword = false;
  brigadas: any[] = [];
  roles = [
    { value: 'bombero', label: 'Bombero' },
    { value: 'comandante', label: 'Comandante' },
    { value: 'logistica', label: 'Logística' },
    { value: 'admin', label: 'Administrador' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private brigadasService: BrigadasService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      rol: ['bombero', [Validators.required]],
      brigada_id: ['', [Validators.required]],
      numero_legajo: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{3}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-\(\)]+$/)]],
      activo: [true]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Si ya está autenticado, redirigir al dashboard
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
    
    // Solo cargar brigadas si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.loadBrigadas();
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
        this.errorMessage = 'Error cargando las brigadas disponibles';
      }
    });
  }

  private passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const userData = this.registerForm.value;
      delete userData.confirmPassword; // Remover confirmación de contraseña

      this.authService.register(userData).subscribe({
        next: (response) => {
          if (response.success) {
            this.successMessage = 'Usuario registrado exitosamente. Redirigiendo...';
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 2000);
          } else {
            this.errorMessage = response.message || 'Error en el registro';
          }
        },
        error: (error) => {
          console.error('Error en registro:', error);
          this.errorMessage = error.error?.message || 'Error en el servidor. Intente nuevamente.';
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) {
        return 'Este campo es requerido';
      }
      if (field.errors['email']) {
        return 'Ingrese un email válido';
      }
      if (field.errors['minlength']) {
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['pattern']) {
        if (fieldName === 'numero_legajo') {
          return 'Formato: BP001 (2 letras + 3 números)';
        }
        if (fieldName === 'telefono') {
          return 'Ingrese un teléfono válido';
        }
      }
    }
    return '';
  }

  getPasswordError(): string {
    const passwordField = this.registerForm.get('password');
    const confirmPasswordField = this.registerForm.get('confirmPassword');
    
    if (this.registerForm.errors?.['passwordMismatch'] && confirmPasswordField?.touched) {
      return 'Las contraseñas no coinciden';
    }
    
    return this.getFieldError('password');
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  onRolChange(): void {
    const rol = this.registerForm.get('rol')?.value;
    const brigadaControl = this.registerForm.get('brigada_id');
    
    if (rol === 'admin') {
      brigadaControl?.clearValidators();
      brigadaControl?.setValue('');
    } else {
      brigadaControl?.setValidators([Validators.required]);
    }
    
    brigadaControl?.updateValueAndValidity();
  }
}
