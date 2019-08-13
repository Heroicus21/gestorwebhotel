import { Injectable } from '@angular/core';
import {Suite} from "../_models/suite";
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Reservas} from '../_models/reservas';
import {EmailBody} from '../_models/emailbody';

@Injectable()
export class SuiteService {

    constructor(private http: Http) { }
    private headers = new Headers({'Content-Type': 'application/json','Access-Control-Allow-Methods': '*' });
//    private headers = new Headers({'Access-Control-Allow-Origin': '*'});
//    private headers = new Headers({});
//    private BASE_URL:string = 'http://wshotelservice.ddns.net:8080/suite';
    private BASE_URL:string = 'http://localhost:8080/suite';

    
    public listarSuites(){		

	return this.http
                        .get(this.BASE_URL+"/all"
                        ,{headers: this.headers})
                        .toPromise()
                        .then(res => res.json() as Suite[])
                    .catch(this.handleError);
	}
    
    public addSuite(suite:Suite){		      
        
	return this.http
                        .post(this.BASE_URL+"/load"
                        ,JSON.stringify(suite)                        
                        ,{headers: this.headers})
                        .toPromise()
                        .then(res => res.json() as Suite)
                    .catch(this.handleError);
    }                    
        
           
    private handleError(error: any): Promise<any> {
            console.error('An error occurred', error); // for demo purposes only
            return Promise.reject(error.message || error);
        }
        
        

}
