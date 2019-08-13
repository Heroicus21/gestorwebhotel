import {Usuario} from './usuario';
import {Personas} from './personas';
 
export class Suite {
    
    idSuite:number;          
    nombre:string;     
    cantPersonas:number;     
    ambientes:number;
    costoPorDia:number;        

constructor() { 
    this.idSuite=-1;
    this.nombre = "";     
    this.cantPersonas=0;
    this.ambientes = 0;        
    this.costoPorDia=0;        
    }
}
     
     


