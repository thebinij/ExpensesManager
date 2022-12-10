import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from '../../_models/interface';
import { ToastService } from '../../shared/toast-notification/service/toast.service';

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
  isLoading: boolean = false;

  
  constructor(private route:Router,private authService: AuthService,  private toastService: ToastService) {}

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.route.navigateByUrl('/dashboard')
    }
  }

  navgativeToSignIn(){
    this.route.navigateByUrl('/login')
  }


  SignUp():void {
    this.isLoading= true;
    // check whether password and confirm password matches
    if(this.newUser.password !== this.newUser.confirmpassword){
      this.toastService.showErrorToast('Error', "Password Doesn't Match");
      this.newUser.password = '';
      this.newUser.confirmpassword = '';
      return;
    }
    const {fullname,email,password}= this.newUser

    this.authService.register(fullname,email,password).subscribe({
      next: (data) => {
        this.toastService.showSuccessToast('Success', 'SignUp Successfull!!!');
        this.isLoading= false;
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
        this.isLoading= false;
      },
    });
  }
}
