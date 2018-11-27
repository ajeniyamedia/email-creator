import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import { DataService } from './data.services'

@Injectable({
  providedIn: 'root'
})
export class EmailService extends DataService{

  constructor( http: Http) { 
    //super('http://localhost:8888/email/index.php/Mailservices/', http);

    super('http://em.dejithemes.com/index.php/Mailservices/', http);
  }
}
