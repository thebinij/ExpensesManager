import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private route:Router) {}

  ngOnInit(): void {}
  Login() {
    if (this.email === 'admin@gmail.com' && this.password === 'Admin123') {
      alert('Login SuccessFul!!');
      this.route.navigateByUrl('/expenses')
    }
    else{
      alert("Credential do not match")
    }
  }
}
