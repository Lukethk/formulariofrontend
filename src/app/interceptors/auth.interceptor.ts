import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtener el token del servicio de autenticación
  const token = authService.getToken();
  
  // Si hay un token, agregarlo al header de autorización
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Manejar la respuesta y capturar errores
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el error es 401 (Unauthorized), redirigir al login
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      
      // Si el error es 403 (Forbidden), mostrar mensaje de permisos insuficientes
      if (error.status === 403) {
        console.error('Acceso denegado: No tienes permisos para realizar esta acción');
      }
      
      return throwError(() => error);
    })
  );
};
