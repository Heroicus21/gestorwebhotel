import {Usuario} from './usuario';
import {Personas} from './personas';
import {Suite} from './suite';
 
export class Reservas {
    idReserva: number;     
    idPersona:Personas;
    idCabania:Suite;
    fechaEntrada:Date;
    fechaSalida:Date;
    monto:number;
        
constructor() { 
        this.idReserva=-1;
        this.idPersona = new Personas();     
        this.idCabania=new Suite();
        this.fechaEntrada = new Date;        
        this.fechaSalida=new Date;
        this.monto=0;    
    }
}
     
     


