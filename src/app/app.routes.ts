import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { VerFormulariosComponent } from './components/ver-formularios/ver-formularios.component';

export const routes: Routes = [
  { path: '', redirectTo: '/necesidades', pathMatch: 'full' },
  { path: 'necesidades', component: FormComponent },
  { path: 'ver-formularios', component: VerFormulariosComponent }
];
