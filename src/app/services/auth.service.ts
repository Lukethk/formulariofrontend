import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment, API_ENDPOINTS } from '../config/environment';

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
  private readonly API_BASE_URL = `${environment.apiUrl}${API_ENDPOINTS.AUTH}`;
  private readonly TOKEN_KEY = 'bomberos_token';
  private readonly USER_KEY = 'bomberos_user';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

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

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.success) {
            this.storeUserData(response.data.token, response.data.user);
          }
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/register`, userData)
      .pipe(
        tap(response => {
          if (response.success) {
            this.storeUserData(response.data.token, response.data.user);
          }
        })
      );
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
    return this.http.get(`${this.API_BASE_URL}/verify`, {
      headers: this.getAuthHeaders()
    });
  }

  changePassword(passwords: { currentPassword: string; newPassword: string }): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/change-password`, passwords, {
      headers: this.getAuthHeaders()
    });
  }

  // Método para obtener headers autenticados para otros servicios
  getAuthenticatedHeaders(): HttpHeaders {
    return this.getAuthHeaders();
  }
}
