import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routes} from './app.router';
import { AppComponent } from './app.component';
import {ClientesComponent} from './clientes/clientes.component';
import {ClientesDetailComponent} from './clientes-detail/clientes-detail.component';
import { ReservasComponent } from './reservas/reservas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginComponent } from './login/login.component';
import { ReservasDetailComponent } from './reservas-detail/reservas-detail.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { SuitesComponent } from './suites/suites.component';

//hashlocation
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PagosComponent } from './pagos/pagos.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ReservasComponent,
    UsuariosComponent,
    LoginComponent,
    ClientesDetailComponent,
    ReservasDetailComponent,
    NavBarComponent,
    BienvenidaComponent,
    SuitesComponent,
    FooterComponent,
    HomeComponent,
    PagosComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [
      {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
