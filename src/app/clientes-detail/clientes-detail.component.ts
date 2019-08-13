import { Component, OnInit ,Input} from '@angular/core';
import {Router,RouterModule} from "@angular/router";
import {Personas} from '../_models/personas';
import {ClientesService} from '../servicios/clientes.service';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-clientes-detail',
  templateUrl: './clientes-detail.component.html',
  styleUrls: ['./clientes-detail.component.css'],
  providers: [ClientesService]
})
export class ClientesDetailComponent implements OnInit {
public clienteAdd:Personas;
private errors:string;

  constructor(private clienteService:ClientesService,private router: Router) { }

  ngOnInit() {
      this.clienteAdd=new Personas();
      this.errors="";
  }
  
  addCliente(){
      console.log(this.clienteAdd.nombre);
      console.log(this.clienteAdd.apellido);
      if (this.clienteAdd.nombre.length<=0){
          this.errors="Debe llenar el NOMBRE ";
          
      }
      if (this.clienteAdd.apellido.length<=0){
          this.errors=this.errors+"Debe llenar el APELLIDO ";
          
      }
      if (this.clienteAdd.mail.length<=0){
          this.errors=this.errors+"Debe llenar el MAIL ";
          
      }
      if (this.clienteAdd.dni==0){
          this.errors=this.errors+"Debe llenar el DNI ";
          
      }
      if (this.errors.length>0){
      alert(this.errors);
      this.errors="";
      return null;
      }
      this.clienteService.addCliente(this.clienteAdd).then(res => {
          console.log(this.clienteAdd = res);
          alert("Cliente agregado con exito");
          this.clienteAdd.id=-1;
          this.clienteAdd.nombre="";
          this.clienteAdd.apellido="";
          this.clienteAdd.dni=0;
          this.clienteAdd.telFijo=0;
          this.clienteAdd.telCel=0;
          this.clienteAdd.mail="";
          this.clienteAdd.descripcion="";
        },error=>{
            alert("Los datos de DNI, telefono y celular deben ser datos reales.");
        });
  }
  logOut(){       
       localStorage.removeItem('currentUser');
       this.router.navigate(['/']);  
  }
  
  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
        }
    }
}
