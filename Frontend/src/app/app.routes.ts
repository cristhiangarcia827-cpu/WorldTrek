import { Routes } from '@angular/router';
import { Login } from './modulo/autenticacion/page/login/login';
import { Registro } from './modulo/autenticacion/page/registro/registro';
import { Dashboard } from './modulo/principal/page/dashboard/dashboard';
import { Viajes } from './modulo/viajes/page/viajes/viajes';
import { Principallayout } from './modulo/principal/layout/principallayout/principallayout';

export const routes: Routes = [
    { path: 'autenticacion/login', component: Login },
    { path: 'autenticacion/registro', component: Registro },
    {
        path: 'principal', component: Principallayout,
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'viajes', component: Viajes }
        ]
    }
];
