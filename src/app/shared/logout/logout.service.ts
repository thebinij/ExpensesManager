import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) { }

  Logout(token:string|null){
    const headers = { 'content-type': 'application/json'}  
    const body =  JSON.stringify({token: token });
    return this.http.post<any>(
      'https://binij-web-server.netlify.app/.netlify/functions/wealthmanager/logout',
      body,{'headers':headers}
    );
  }
}
