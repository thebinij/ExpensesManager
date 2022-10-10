import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn:boolean = false;
  isAdmin:boolean = false;
  constructor() { }

  Login(email:string, password:string){
    if (email === 'admin@gmail.com' && password === 'Admin123') {
     this.isLoggedIn = true;
     this.isAdmin = true;
    }
    else if(email === 'user@gmail.com' && password === 'User123'){
      this.isLoggedIn = true;
      this.isAdmin = false;
    }
    return this.isLoggedIn;
  }
 
}
