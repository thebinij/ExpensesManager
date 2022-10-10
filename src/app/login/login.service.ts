import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn:boolean = false;
  constructor() { }

  Login(email:string, password:string){
    if (email === 'admin@gmail.com' && password === 'Admin123') {
     this.isLoggedIn = true;
    }
    return this.isLoggedIn;
  }
 
}
