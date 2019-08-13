import { Component, OnInit } from '@angular/core';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Reservas} from '../_models/reservas';
import {Pago} from '../_models/pago';
import {ReservasService} from '../servicios/reservas.service';
import {PagoService} from '../servicios/pago.service';
import {Personas} from'../_models/personas';
import {ClientesService} from '../servicios/clientes.service';
import {Suite} from '../_models/suite';
import {SuiteService} from '../servicios/suite.service';
import {Params,ActivatedRoute,Router} from "@angular/router";

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css'],
   providers: [ReservasService, ClientesService,SuiteService,PagoService]
})
export class PagosComponent implements OnInit {
public reserva:Reservas;
public pago:Pago;
public idReserva:number;
  constructor(private reservasService: ReservasService,
              private clienteService: ClientesService,
              private suiteService: SuiteService,
              private rutaActiva: ActivatedRoute,
              private pagoService:PagoService,
              private router:Router) {}

  ngOnInit(){
      this.pago=new Pago();
      this.rutaActiva.params
          .subscribe(params => { this.idReserva = params['id']; });
      this.getReserva(this.idReserva);
      this.pago.reserva=this.reserva;
      this.pago.monto=this.reserva.monto;
//      this.pago.persona=this.reserva.idPersona;
  }
  
  getReserva(id:number){
      this.reservasService.getReserva(id).then(res=>{
          this.reserva=res;
          this.pago.reserva=this.reserva;
          
      });;    
    }
    
  hacerPago(){
      this.pagoService.realizarPago(this.pago).then(res=>{
          this.pago=res;
          alert("Se realizo el pago con exito");
          this.router.navigate(['/reservas']);
      });;    
    }

}
