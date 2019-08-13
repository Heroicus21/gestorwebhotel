import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Usuario} from '../_models/usuario';
import {LoginService} from '../servicios/login.service';
import { Observable }        from 'rxjs/Observable';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
    user:Usuario;
    users: Usuario[]; 
    userLoged:Usuario;
  constructor(private loginService: LoginService,private route: ActivatedRoute,
        private router: Router) {
      
      console.log('constructor iniciado');
      
    }

  ngOnInit() {
      this.user=new Usuario();
      this.userLoged = new Usuario();
      this.logout();
  }
    validarUsuario(): void {
        console.log('usuario validado');
        console.log(this.user.usuario);
        console.log(this.user.psw);
        this.loginService.login(this.user.usuario, this.user.psw).then(res => {
        this.userLoged = res;
        localStorage.setItem('currentUser', JSON.stringify(this.userLoged));
        this.router.navigate(['bienvenida']);
        console.log(this.userLoged.usuario);
});      
    };
                
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
