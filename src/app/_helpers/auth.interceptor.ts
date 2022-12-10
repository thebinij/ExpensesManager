import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

// THIS INTERCEPTOR IS NOT USED CURRENTLY
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  omitCalls = ['login', 'signup','auth'];
  skipInterceptor = false;


  constructor(private router: Router,private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.omitCalls.forEach(api => {
      if (request.url.includes(api)) {
        this.skipInterceptor = true;
      }
    });
    const token = this.authService.getAuthToken();
    if(token && !this.skipInterceptor){
      const tokenizedReq  = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }  
      })
      return next.handle(tokenizedReq).pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 401) {
            this.router.navigateByUrl('/login');
          }
        }
        return event;
      }))

    } 
    return next.handle(request);
  }
}
