import { Component, OnInit ,Directive, ElementRef} from '@angular/core';
import {Personas} from '../_models/personas';
import {Reservas} from '../_models/reservas';
import {ClientesService} from '../servicios/clientes.service';
import {ReservasService} from '../servicios/reservas.service';
import { NgModel } from '@angular/forms';
import {EmailBody} from '../_models/emailbody';
import {Suite} from '../_models/suite';
import {SuiteService} from '../servicios/suite.service';
import {Router,RouterModule} from "@angular/router";


@Component({
  selector: 'app-reservas-detail',
  templateUrl: './reservas-detail.component.html',
  styleUrls: ['./reservas-detail.component.css'],
  providers:[ClientesService,ReservasService,SuiteService]
})
export class ReservasDetailComponent implements OnInit {
public dniBuscado:number;
public idCabania:number;
public fechaEntrada:Date;
public fechaSalida:Date;
public clienteSeleccionado: Personas;
public cantDias:number;
public precio:number;
public mailEnviado:boolean;
public suitesList:Suite[];
public suiteSelected:Suite;
public email:string;

    public emailBody: EmailBody;
    public reserva: Reservas;
  constructor(private clienteService:ClientesService,
  private reservaService:ReservasService,
  private suiteService: SuiteService,
  private router: Router) { }

  ngOnInit() {
      this.email="";
      this.suitesList = new Array<Suite>();
      this.suiteSelected = new Suite;
      this.getSuites();
      this.mailEnviado=false;
      this.idCabania=1;
      this.clienteSeleccionado = new Personas;
      this.reserva = new Reservas;
      this.emailBody = new EmailBody;
  }

findClienteByDni():void{
    
   this.clienteService.findClienteByDni(this.dniBuscado).then(res => {
       this.clienteSeleccionado = res;
       this.reserva.idPersona =this.clienteSeleccionado;
       alert(this.clienteSeleccionado.nombre+" "+this.clienteSeleccionado.apellido);
        });;     
    };
    
    guardarReserva():void{
        if (!(this.reserva.monto>1)){
             this.cotizarReserva();
             return;
             }     
        alert(this.reserva.idPersona.nombre + " " + this.reserva.idPersona.apellido);
        this.reserva.idCabania = this.suiteSelected;
        this.reserva.fechaEntrada = this.fechaEntrada;
        this.reserva.fechaSalida = this.fechaSalida;
        this.reserva.monto = this.precio;
        this.reservaService.addReserva(this.reserva).then(res => {
            this.reserva = res;
            alert("La reserva se realizo con exito");
            this.mailSend();
        },error=>{
            alert("No es posible hacer la reserva ya que la suite esta reservada");
        });;     
    };
    
    cotizarReserva():void{
        
        this.reserva.fechaEntrada = this.fechaEntrada;
        this.reserva.fechaSalida = this.fechaSalida;
        this.reservaService.cotizarReserva(this.reserva).then(res => {
            this.cantDias = res;
            this.precio = this.suiteSelected.costoPorDia * this.cantDias;
            this.reserva.monto=this.precio;
            alert("La reserva es de " + this.cantDias +" días con un total de: "+ this.precio+ " El costo por dia es: "+ this.suiteSelected.costoPorDia);
            
        })
    };
    
    mailSend(){
        this.emailBody.cliente = this.reserva.idPersona.nombre + " " + this.reserva.idPersona.apellido;
        this.email = this.reserva.idPersona.mail;
        this.emailBody.mensaje = "Reservado";
        this.emailBody.email = this.email;
        this.reservaService.enviarMail(this.emailBody).then(res => {
            this.mailEnviado = res;
            
            alert("Se envio un correo a su casilla");
        })
  }
  getSuites(){
      this.suiteService.listarSuites().then(res=>{
          this.suitesList=res;
      });;    
  }
  onInput($event) {
    $event.preventDefault();
    console.log('selected: ' + $event.target.value);
    
    
  }
  
   logOut(){       
       localStorage.removeItem('currentUser');
       this.router.navigate(['/']);  
  }
}
