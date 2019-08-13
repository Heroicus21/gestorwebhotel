import { Injectable } from '@angular/core';
import {Usuario} from "../_models/usuario";
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Reservas} from '../_models/reservas';
import {EmailBody} from '../_models/emailbody';

@Injectable()
export class ReservasService {

    constructor(private http: Http) { }
    private headers = new Headers({'Content-Type': 'application/json','Access-Control-Allow-Methods': '*' });
//    private headers = new Headers({'Access-Control-Allow-Origin': '*'});
//    private headers = new Headers({});
//    private BASE_URL:string = 'http://wshotelservice.ddns.net:8080/reservas';
    private BASE_URL:string = 'http://localhost:8080/reservas';
    private userLoged: Usuario;
    
    public listarReservas(){		
//          this.userLoged =new Usuario();
            return this.http.get(this.BASE_URL+"/all"
                        ,{headers: this.headers})
                        .toPromise()
                        .then(res => res.json() as Reservas[])
                        .catch(this.handleError);
	}
    
    public getReserva(id:number){		
//            this.userLoged =new Usuario();
            return this.http.get(this.BASE_URL+"/find/"+id 
                       ,{headers: this.headers})
                       .toPromise()
                       .then(res => res.json() as Reservas)
                       .catch(this.handleError);
	}     
        
    public addReserva(reserva:Reservas){		              
            return this.http.post(this.BASE_URL+"/load"
                        ,JSON.stringify(reserva)                        
                        ,{headers: this.headers})
                        .toPromise()
                        .then(res => res.json() as Reservas)
                        .catch(this.handleError);
	}
        
    public borrarReserva(idReserva:number){
        
        let body = {"idReserva": idReserva};		              
            return this.http.put(this.BASE_URL+"/delete"
                        ,body                        
                        ,{headers: this.headers})
                        .toPromise()
                        .then(res => res.json() as Reservas)
                        .catch(this.handleError);
	}
        
    public cotizarReserva(reserva:Reservas){		              
            return this.http.post(this.BASE_URL+"/cotizar"
                        ,JSON.stringify(reserva)                        
                        ,{headers: this.headers})
                        .toPromise()
                        .then(res => res.json())
                        .catch(this.handleError);
	}
        
    public enviarMail(emailBody: EmailBody){		              
            return this.http.post(this.BASE_URL+"/email-sender "
                        , JSON.stringify(emailBody)                        
                        ,{headers: this.headers})
                        .toPromise()
                        .then(res => res.json())
                        .catch(this.handleError);
	}        
        
           
    private handleError(error: any): Promise<any> {
            console.error('An error occurred', error); // for demo purposes only
            return Promise.reject(error.message || error);
        }

}
