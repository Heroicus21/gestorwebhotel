import { Component, OnInit ,Input} from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }
title = 'app';
  public loged:boolean;
   ngOnInit() {
      this.loged=false;
      console.log(localStorage.getItem('currentUser'));
      if (localStorage.getItem('currentUser').length>0){
          this.loged=true;
      }
  
   }   
     logOut(){
       
       localStorage.removeItem('currentUser');  
        }
  }
