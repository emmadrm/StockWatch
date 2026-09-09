import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Portfolio } from './portfolio/portfolio';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'portfolio', component: Portfolio },
];
