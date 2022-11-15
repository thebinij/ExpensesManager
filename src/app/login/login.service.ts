import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  Login(email:string, password:string){
    const headers = { 'content-type': 'application/json'}  
    const body =  JSON.stringify( {email, password} );
    return this.http.post<any>(
      'https://binij-web-server.netlify.app/.netlify/functions/wealthmanager/login',
      body,{'headers':headers}
    );
  }
  checkRefreshToken(){
    if(localStorage.getItem('refreshToken')) return true;
    return false;
  }
}
