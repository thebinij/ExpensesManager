import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/toast-notification/service/toast.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private route:Router,private authservice: AuthService,  private toastService: ToastService) {}

  ngOnInit(): void {
    //checking user exists
    if(localStorage.getItem('user')){
      this.route.navigateByUrl('/dashboard')
    }
  }

  navgativeToSignUp(){
    this.route.navigateByUrl('/signup')
  }

  Login():void {
    if(!this.email || !this.password ){
      this.toastService.showErrorToast('Error', "Invalid Crediential!");
      return;
    }

    this.authservice.login(this.email, this.password).subscribe({
      next: (data) => {
        console.log(data)
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
