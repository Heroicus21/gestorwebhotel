/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
export class Personas {
    id: number;     
    nombre:string;
    apellido:string;
    dni:number;
    telFijo:number;
    telCel:number;
    mail:string;
    descripcion:string;
    
     constructor( ) { 
        this.id=-1;
        this.nombre="";
        this.apellido="";
        this.dni=0;
        this.telFijo=0;       
        this.descripcion="";
        this.telCel=0;
        this.mail="";
    }
}
     
     


