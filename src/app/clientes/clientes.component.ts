import { Component, OnInit } from '@angular/core';
import {Personas} from '../_models/personas';
import {ClientesService} from '../servicios/clientes.service';
import { NgModel } from '@angular/forms';
import {Router,RouterModule} from "@angular/router"; 

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ClientesService]
})
export class ClientesComponent implements OnInit {

    private personasList:Personas[];
    public dniBuscado:number;
    private clienteBuscado:Personas;
    public editar:boolean;
    public edicion:boolean;
    private clienteSeleccionado:Personas;
    
  constructor(private clienteService:ClientesService,private router: Router) { 
        
  }

  ngOnInit() {
      this.editar=false;
      this.edicion=true;
      this.getClientes();
      this.dniBuscado=0;
      this.clienteBuscado = new Personas();
      this.clienteSeleccionado=new Personas();
  }
  
  getClientes(): void {
        
        this.clienteService.listarClientes().then(res => {
            this.personasList = res;
        });      
    };
  borrarCliente(cliente:Personas):void{
     
   console.log('usuario validado');
   this.clienteService.deleteCliente(cliente);  
   this.getClientes();    
    };
    
   findClienteByDni():void{ 
   this.clienteService.findClienteByDni(this.dniBuscado).then(res => {
       
       this.clienteBuscado = res;
       this.personasList.length=0;
       this.personasList.includes(this.clienteBuscado);
        });;     
    };
    
    editarCliente(cliente:Personas){
        this.editar=true;
        this.edicion=false;
        this.clienteSeleccionado=cliente;
        
    }
    cancelarEditarCliente(){
        this.editar=false;
        this.edicion=true;        
    }
    guardarEdicionCliente(){
      console.log(this.clienteSeleccionado.nombre);
      console.log(this.clienteSeleccionado.apellido);
     
      
      this.clienteService.addCliente(this.clienteSeleccionado).then(res => {
          console.log(this.clienteSeleccionado = res);
          alert("Cliente editado con exito");
            this.editar=false;
            this.edicion=true;
            this.getClientes(); 
          });
  }
  logOut(){       
       localStorage.removeItem('currentUser');
       this.router.navigate(['/']);  
  }

}
