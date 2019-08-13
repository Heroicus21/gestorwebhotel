import { Injectable } from '@angular/core';
import {Usuario} from "../_models/usuario";
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Reservas} from '../_models/reservas';
import {EmailBody} from '../_models/emailbody';
import {Pago} from '../_models/pago';

@Injectable()
export class PagoService {

    constructor(private http: Http) { }
    private headers = new Headers({'Content-Type': 'application/json','Access-Control-Allow-Methods': '*' });
//    private headers = new Headers({'Access-Control-Allow-Origin': '*'});
//    private headers = new Headers({});
//    private BASE_URL:string = 'http://wshotelservice.ddns.net:8080/pago';
    private BASE_URL:string = 'http://localhost:8080/pago';
    private userLoged: Usuario;
            
    public realizarPago(pago:Pago){		              
            return this.http.post(this.BASE_URL+"/add"
                        ,JSON.stringify(pago)                        
                        ,{headers: this.headers})
                        .toPromise()
                        .then(res => res.json() as Pago)
                        .catch(this.handleError);
	}
           
    private handleError(error: any): Promise<any> {
            console.error('An error occurred', error); // for demo purposes only
            return Promise.reject(error.message || error);
        }

}
