import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../_services/login.service';
import { ToastService } from '../../shared/toast-notification/service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private route:Router,private loginservice: LoginService,  private toastService: ToastService) {}

  ngOnInit(): void {
    if(localStorage.getItem('refreshToken')){
      this.route.navigateByUrl('/dashboard')
    }
  }
  navgativeToSignUp(){
    this.route.navigateByUrl('/signup')
  }
  Login() {
    if(!this.email || !this.password ){
      return;
    }
    this.loginservice.Login(this.email, this.password).subscribe({
      next: (data) => {
        localStorage.setItem('accessToken',data.token)
        localStorage.setItem('refreshToken',data.refreshToken)
        this.route.navigateByUrl('/dashboard')
        this.toastService.showSuccessToast('Success', 'Login Successfull!!!');
      },
      error: (error) => {
        console.error(error);
        if(error.status ==400){
          this.toastService.showErrorToast('Error', error.error.message);
        }
        else if (error.status==422){
          this.toastService.showErrorToast('Error', error.error.error[0]);
        }
        else{
          this.toastService.showErrorToast('Error',"Something went Wrong!");
        }
      },
    });
  }
}
