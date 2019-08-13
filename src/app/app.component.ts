import {Component, OnInit, AfterContentChecked} from '@angular/core';
import {Router,RouterModule} from "@angular/router";
import {NavBarComponent} from "./nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public loged:boolean; 
 
constructor( private router: Router) { }  
  ngOnInit() {
      this.loged=false;
      console.log(localStorage.getItem('currentUser'));
      if (localStorage.getItem('currentUser').length>0){
          this.loged=true;
      }
  
   }   
     logOut(){       
       localStorage.removeItem('currentUser');
       this.router.navigate(['/']);  
  }
}
