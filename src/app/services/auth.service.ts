import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  brigada_id?: string;
  numero_legajo?: string;
  telefono?: string;
  activo: boolean;
}

// Interfaz extendida para usuarios mock con password
interface MockUser extends User {
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
  rol: string;
  brigada_id?: string;
  numero_legajo?: string;
  telefono?: string;
  activo?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'bomberos_token';
  private readonly USER_KEY = 'bomberos_user';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Usuarios mock para emergencia
  private mockUsers: MockUser[] = [
    {
      id: '1',
      nombre: 'Administrador',
      email: 'admin@bomberos.com',
      password: 'admin123',
      rol: 'admin',
      brigada_id: '1',
      numero_legajo: '001',
      telefono: '123456789',
      activo: true
    },
    {
      id: '2',
      nombre: 'Juan Pérez',
      email: 'juan@bomberos.com',
      password: 'juan123',
      rol: 'bombero',
      brigada_id: '1',
      numero_legajo: '002',
      telefono: '987654321',
      activo: true
    },
    {
      id: '3',
      nombre: 'María García',
      email: 'maria@bomberos.com',
      password: 'maria123',
      rol: 'supervisor',
      brigada_id: '2',
      numero_legajo: '003',
      telefono: '555666777',
      activo: true
    }
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loadStoredUser();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private loadStoredUser(): void {
    if (this.isBrowser()) {
      const user = localStorage.getItem(this.USER_KEY);
      if (user) {
        try {
          this.currentUserSubject.next(JSON.parse(user));
        } catch (error) {
          console.error('Error parsing stored user:', error);
          this.clearStoredData();
        }
      }
    }
  }

  private clearStoredData(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.currentUserSubject.next(null);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Login mock sin API
  login(credentials: LoginRequest): Observable<AuthResponse> {
    const user = this.mockUsers.find(u => 
      u.email === credentials.email && 
      u.password === credentials.password
    );

    if (user) {
      const token = this.generateMockToken();
      const userWithoutPassword = { ...user };
      delete (userWithoutPassword as any).password;
      
      const response: AuthResponse = {
        success: true,
        message: 'Login exitoso',
        data: {
          token: token,
          user: userWithoutPassword
        }
      };

      this.storeUserData(token, userWithoutPassword);
      return of(response);
    } else {
      const errorResponse: AuthResponse = {
        success: false,
        message: 'Credenciales inválidas',
        data: {
          token: '',
          user: {} as User
        }
      };
      return of(errorResponse);
    }
  }

  // Register mock sin API
  register(userData: RegisterRequest): Observable<AuthResponse> {
    const newUser: User = {
      id: (this.mockUsers.length + 1).toString(),
      nombre: userData.nombre,
      email: userData.email,
      rol: userData.rol,
      brigada_id: userData.brigada_id,
      numero_legajo: userData.numero_legajo,
      telefono: userData.telefono,
      activo: userData.activo || true
    };

    // Agregar a usuarios mock
    this.mockUsers.push({ ...newUser, password: userData.password } as MockUser);

    const token = this.generateMockToken();
    const response: AuthResponse = {
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        token: token,
        user: newUser
      }
    };

    this.storeUserData(token, newUser);
    return of(response);
  }

  private generateMockToken(): string {
    return 'mock_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private storeUserData(token: string, user: User): void {
    if (this.isBrowser()) {
      try {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      } catch (error) {
        console.error('Error storing user data:', error);
      }
    }
    this.currentUserSubject.next(user);
  }

  logout(): void {
    this.clearStoredData();
    if (this.isBrowser()) {
      this.router.navigate(['/login']);
    }
  }

  verifyToken(): Observable<any> {
    const token = this.getToken();
    if (token && token.startsWith('mock_token_')) {
      return of({ valid: true, user: this.getCurrentUser() });
    }
    return of({ valid: false });
  }

  changePassword(passwords: { currentPassword: string; newPassword: string }): Observable<any> {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const userIndex = this.mockUsers.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        (this.mockUsers[userIndex] as MockUser).password = passwords.newPassword;
        return of({ success: true, message: 'Contraseña cambiada exitosamente' });
      }
    }
    return of({ success: false, message: 'Error al cambiar contraseña' });
  }

  // Método para obtener headers autenticados para otros servicios
  getAuthenticatedHeaders(): HttpHeaders {
    return this.getAuthHeaders();
  }

  // Método para obtener usuarios mock (para desarrollo)
  getMockUsers(): User[] {
    return this.mockUsers.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
}
