import { Routes } from '@angular/router';
import { Login } from './modulo/autenticacion/page/login/login';
import { Registro } from './modulo/autenticacion/page/registro/registro';
import { Dashboard } from './modulo/principal/page/dashboard/dashboard';
import { Viajes } from './modulo/viajes/page/viajes/viajes';
import { Principallayout } from './modulo/principal/layout/principallayout/principallayout';
import { Paises } from './modulo/pais/page/paises/paises';
import { InfoComponent } from './modulo/pais/page/Informacion/info';


export const routes: Routes = [
    { path: 'autenticacion/login', component: Login },
    { path: 'autenticacion/registro', component: Registro },
    {
        path: '', component: Principallayout, 
        children: [
            { path: '', component: Dashboard, },
            { path: 'viajes', component: Viajes },
            { path: 'paises', component: Paises },
            { path: 'paisdetalle', component: InfoComponent }
        ]
    }
];
