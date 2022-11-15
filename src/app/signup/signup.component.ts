import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/schemas/interface';
import { ToastService } from '../shared/toast-notification/service/toast.service';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  newUser: User = {
    fullname: '',
    email: '',
    password: '',
    confirmpassword:''
  };
  
  constructor(private route:Router,private signupService: SignupService,  private toastService: ToastService) {}

  ngOnInit(): void {
    if(localStorage.getItem('refreshToken')){
      this.route.navigateByUrl('/dashboard')
    }
  }

  navgativeToSignIn(){
    this.route.navigateByUrl('/login')
  }
  signUp() {
    if(this.newUser.password !== this.newUser.confirmpassword){
      this.toastService.showErrorToast('Error', "Password Doesn't Match");
      this.newUser.password = '';
      this.newUser.confirmpassword = '';
      return;
    }
    this.signupService.SignUp(this.newUser.fullname,this.newUser.email,this.newUser.password).subscribe({
      next: (data) => {
        localStorage.setItem('accessToken',data.token)
        localStorage.setItem('refreshToken',data.refreshToken)
        this.route.navigateByUrl('/dashboard')
        this.toastService.showSuccessToast('Success', 'SignUp Successfull!!!');
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
    this.newUser = {
      fullname: '',
      email: '',
      password: '',
      confirmpassword:''
    };
  }
}
