import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
    { path: 'login', component: Login },
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        children: [
            // Add child routes here later, e.g., { path: 'courses', ... }
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
