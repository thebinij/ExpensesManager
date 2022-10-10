import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private route:Router, private loginservice: LoginService) {}

  ngOnInit(): void {}
  Login() {
    if (this.loginservice.Login(this.email, this.password)) {
      alert('Login SuccessFul!!');
      this.route.navigateByUrl('/expenses')
    }
    else{
      alert("Credential do not match")
    }
  }
}
