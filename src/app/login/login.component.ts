import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor() {}

  ngOnInit(): void {}
  Login() {
    if (this.email === 'admin@gmail.com' && this.password === 'Admin123') {
      alert('Login SuccessFul!!');
    }
    else{
      alert("Credential do not match")
    }
  }
}
