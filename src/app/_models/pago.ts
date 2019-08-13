import {Usuario} from './usuario';
import {Suite} from './suite';
import {Reservas} from './reservas';
 
export class Pago {
    reserva: Reservas;     
    idPago:number;
    fechaPago:Date;
    monto:number;
    pago:boolean;
        
constructor() { 
    this.idPago=-1;
    this.reserva = new Reservas();     
    this.fechaPago = new Date;        
    this.monto=0;
    this.pago=false;   
    }
}
     
     


