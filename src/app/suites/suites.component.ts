import { Component, OnInit } from '@angular/core';
import {Suite} from '../_models/suite';
import {SuiteService} from '../servicios/suite.service';
import { NgModel } from '@angular/forms';
import {Router} from "@angular/router";
@Component({
  selector: 'app-suites',
  templateUrl: './suites.component.html',
  styleUrls: ['./suites.component.css'],
  providers:[SuiteService]
})
export class SuitesComponent implements OnInit {
public suitesList:Suite[];
public suiteSelected:Suite;
public edicion:boolean;
public editar:boolean;

  constructor(private suiteService: SuiteService, private router: Router) { }

  ngOnInit() {
      this.suitesList = new Array<Suite>();
      this.suiteSelected = new Suite;
      this.edicion=true;
      this.getSuites();
  }
  
  getSuites(){
      this.suiteService.listarSuites().then(res=>{
          this.suitesList=res;
      });;    
  }
  prepararEdicion(suite:Suite){
        this.editar=true;
        this.edicion=false;
        this.suiteSelected=suite;
        
        
        
    }
    
  guardarSuite(){
      this.suiteService.addSuite(this.suiteSelected)
      .then(res => {this.getSuites()
          ,alert("Se edito con exito")
          ,this.router.navigate(['suites']);
          }
          ,error=>{alert("error en el guardado")});
  }
  
  logOut(){       
       localStorage.removeItem('currentUser');
       this.router.navigate(['/']);  
  }
  
 }
    
