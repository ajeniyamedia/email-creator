import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';


// @Injectable({
//   providedIn: 'root'
// })
export class DataService {

  constructor(private url: string, private http: Http) { }

  uploadLogo(resource){
    return this.http.post( this.url + 'updateLogo', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  getVendorInformation(resource){
    return this.http.post( this.url +'getVendorInformation', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  getContent(resource){
    return this.http.post( this.url +'getContent', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  addContent(resource){
    return this.http.post( this.url + 'updateContent', resource)
    .map( response  => response.json())
    .catch(this.handleError );
  }

  updateFieldSetting(resource){
    return this.http.post( this.url + 'updateVendorEmailSetting', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }


  getFieldSetting(resource){
    return this.http.post( this.url + 'getVendorEmailSetting', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }


  addSetting(resource){
    return this.http.post( this.url + 'addSetting', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }


  getSetting(resource){
    return this.http.post( this.url + 'getSetting', resource)
    .map( response  => response.json())
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));
      
    if (error.status === 404)
      return Observable.throw(new NotFoundError());

    return Observable.throw(new AppError(error));
  }


}
