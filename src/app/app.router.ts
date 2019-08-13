import {ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {ReservasComponent} from './reservas/reservas.component';
import {ClientesComponent} from './clientes/clientes.component';

import {LoginComponent} from './login/login.component';
import {ClientesDetailComponent} from './clientes-detail/clientes-detail.component';
import {ReservasDetailComponent} from './reservas-detail/reservas-detail.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {BienvenidaComponent} from './bienvenida/bienvenida.component';
import {SuitesComponent} from './suites/suites.component';
import {PagosComponent} from './pagos/pagos.component';


export const router: Routes=[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path: 'bienvenida', component: BienvenidaComponent},
    {path: 'reservas', component: ReservasComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'pagos', component: PagosComponent},
    {path: 'pagos/:idreserva', component: PagosComponent},
    {path: 'suites', component: SuitesComponent},
    {path: 'clientes/clientes-detail', component: ClientesDetailComponent},
    {path: 'reservas/reservas-detail', component: ReservasDetailComponent},
    {path: 'nav-bar', component: NavBarComponent},
    {path: 'login', component: LoginComponent}    
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);