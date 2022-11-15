import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/schemas/interface';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  SignUp(fullname:string,email:string,password:string){
    const headers = { 'content-type': 'application/json'}  
    const body =  JSON.stringify({fullname,email, password});
    return this.http.post<any>(
      'https://binij-web-server.netlify.app/.netlify/functions/wealthmanager/signup',
      body,{'headers':headers}
    );
  }
}
