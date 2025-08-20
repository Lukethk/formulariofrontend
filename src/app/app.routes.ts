import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { VerFormulariosComponent } from './components/ver-formularios/ver-formularios.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  // Rutas públicas (solo para usuarios no autenticados)
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [NoAuthGuard] 
  },
  { 
    path: 'register', 
    component: RegisterComponent, 
    canActivate: [NoAuthGuard] 
  },
  
  // Rutas protegidas (solo para usuarios autenticados)
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'necesidades', 
    component: FormComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'ver-formularios', 
    component: VerFormulariosComponent, 
    canActivate: [AuthGuard] 
  },
  
  // Ruta por defecto - redirigir al dashboard
  { path: '**', redirectTo: '/dashboard' }
];
