import { Component, OnInit } from '@angular/core';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Reservas} from '../_models/reservas';
import {ReservasService} from '../servicios/reservas.service';
import {Personas} from'../_models/personas';
import {ClientesService} from '../servicios/clientes.service';
import {Suite} from '../_models/suite';
import {SuiteService} from '../servicios/suite.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css'],
  providers: [ReservasService, ClientesService,SuiteService] 
})
export class ReservasComponent implements OnInit {
    public suitesList:Suite[];
    public suiteSelected:Suite;
    public reservasList:Reservas[];
    public reservaSelected:Reservas;
    public dniBuscado:number;
    public idCabania:number;
    public fechaEntrada:Date;
    public fechaSalida:Date;
    public clienteSeleccionado: Personas;
    public editar:boolean;
    public edicion:boolean;
    
// public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
//    public doughnutChartData:number[] = [350, 450, 100];
//    public doughnutChartType:string = 'doughnut';
    
    public cantDias:number;
    public precio:number;
  
    constructor(private reservasService: ReservasService,
     private clienteService: ClientesService,
     private suiteService: SuiteService,
     private router: Router
     ) { }

    ngOnInit() {
      this.suitesList = new Array<Suite>();
      this.suiteSelected = new Suite;
      this.getSuites();
      this.reservasList = new Array<Reservas>();
      this.editar=false;
      this.edicion=true;
      this.getReservas();
    }
    
    getReservas(){
      this.reservasService.listarReservas().then(res=>{
          this.reservasList=res;
      });;    
    }
  
    findClienteByDni():void{
    
   this.clienteService.findClienteByDni(this.dniBuscado).then(res => {
       this.clienteSeleccionado = res;
       this.reservaSelected.idPersona =this.clienteSeleccionado;
       alert(this.clienteSeleccionado.nombre+" "+this.clienteSeleccionado.apellido);
        });;     
    };
  
    prepararEdicion(reserva:Reservas){
        this.editar=true;
        this.edicion=false;
        this.reservaSelected=reserva;                        
    }
    
    salirEdicion(){
        this.editar=false;
        this.edicion=true;                        
    }
  
    guardarReserva():void{
        if (!(this.reservaSelected.monto>1)){
             alert("Debe de cotizar antes de guardar");
             return;
             }
      this.reservaSelected.fechaEntrada
            this.reservasService.addReserva(this.reservaSelected).then(res => {
            this.reservaSelected = res;
            this.editar=false;
            this.edicion=true;
            alert("La reserva se edito con exito");                    
        });     
    };
    
    borrarReserva(reserva: number):void{
      
      this.reservasService.borrarReserva(reserva).then(res => {
            this.reservaSelected = res;
            this.editar=false;
            this.edicion=true;
            alert("Se borro el registro con exito");                    
            },
            error=>{ 
            this.getReservas();
            alert("Se borro el registro")});
    }
    
    getSuites(){
      this.suiteService.listarSuites().then(res=>{
          this.suitesList=res;
      });;    
  }
  
  cotizarReserva():void{
        this.reservasService.cotizarReserva(this.reservaSelected).then(res => {
            this.cantDias = res;
            this.precio = this.suiteSelected.costoPorDia * this.cantDias;
            this.reservaSelected.monto=this.precio;
            alert("La reserva es de " + this.cantDias +" días con un total de: "+ this.precio+ " El costo por dia es: "+ this.suiteSelected.costoPorDia);
        })
    };
    
    logOut(){       
       localStorage.removeItem('currentUser');
       this.router.navigate(['/']);  
  }
}
