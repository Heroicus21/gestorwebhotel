import { Injectable } from '@angular/core';
import {Usuario} from "../_models/usuario";
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Personas} from '../_models/personas';

@Injectable()
export class ClientesService {

    constructor(private http: Http) { }
    private headers = new Headers({'Content-Type': 'application/json','Access-Control-Allow-Methods': '*' });
//    private headers = new Headers({'Access-Control-Allow-Origin': '*'});
//    private headers = new Headers({});
//    private BASE_URL:string = 'http://wshotelservice.ddns.net:8080/cliente';
        private BASE_URL:string = 'http://localhost:8080/cliente';
    private cliente: Personas;
    
    public listarClientes(){		      
        
	return this.http
                        .get(this.BASE_URL+"/all"
                        ,{headers: this.headers})
                        .toPromise()
                        .then(res => res.json() as Personas[])
                    .catch(this.handleError);
	}
        
        
    public addCliente(cliente:Personas){		      
        
	return this.http
                        .post(this.BASE_URL+"/load"
                        ,JSON.stringify(cliente)                        
                        ,{headers: this.headers})
                        .toPromise()
                        .then(res => res.json() as Personas)
                    .catch(this.handleError);
	}
        
    public getCliente(dni:number){		      
        
	return this.http
                        .get(this.BASE_URL+"/"+dni
                        ,{headers: this.headers})
                        .toPromise()
                        .then(res => res.json() as Personas[])
                    .catch(this.handleError);
	} 
        
    public deleteCliente(cliente:Personas){		      
        
	return this.http
                        .put(this.BASE_URL+"/delete"
                        ,JSON.stringify(cliente)                      
                        ,{headers: this.headers})
                        .toPromise()
                    .catch(this.handleError);
	}
    
    public findClienteByDni(dni:number){		      
        
	return this.http
                        .get(this.BASE_URL+"/"
                        + dni                      
                        ,{headers: this.headers})
                        .toPromise()
                    .then(res => res.json() as Personas[])
                    .catch(this.handleError);
	}   
    
        
    private handleError(error: any): Promise<any> {
            console.error('An error occurred', error); // for demo purposes only
            return Promise.reject(error.message || error);
        }

}
