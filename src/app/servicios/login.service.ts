import { Injectable } from '@angular/core';
import {Usuario} from "../_models/usuario";
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import * as Cookies from 'es-cookie';

@Injectable()
export class LoginService {

    constructor(private http: Http) { }
    private headers = new Headers({'Content-Type': 'application/json','Access-Control-Allow-Methods': '*' });
//    private headers = new Headers({'Access-Control-Allow-Origin': '*'});
//    private headers = new Headers({});
//    private BASE_URL:string = 'http://wshotelservice.ddns.net:8080/users/validate';
    private BASE_URL:string = 'http://localhost:8080/users/validate';
    private userLoged: Usuario;
    
    public login(usuario:string, psw:string){		
        let body=JSON.stringify({"usuario":usuario,
                  "psw":psw});
        this.userLoged =new Usuario();
        this.userLoged.usuario = usuario;
        this.userLoged.psw = psw; 
        
	return this.http
                        .post(this.BASE_URL
                        , body,
                         {headers: this.headers})
                        .toPromise()
                        .then(res => res.json() as Usuario)
                    .catch(this.handleError);
	}
        
    private handleError(error: any): Promise<any> {
            console.error('An error occurred', error); // for demo purposes only
            return Promise.reject(error.message || error);
        }

}
