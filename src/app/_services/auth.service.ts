import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient,) {}

  getAuthToken() {
    const user = localStorage.getItem('user');
    let accessToken = null
    if(user){
      const credentials:any = Object.values(JSON.parse(user))[0]
      accessToken = credentials.token;
    }
    return accessToken;
  }

  checkValidRefreshToken(){
    return true;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(
        `${environment.apiUrl}/auth/login`,
        { email, password },
        httpOptions
      )
      .pipe(
        map((user: any) => {
          localStorage.setItem('user', JSON.stringify(user))
          this.router.navigateByUrl('/dashboard');
        })
      );
  }

  register(fullname: string, email: string, password: string): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}/auth/signup`,
        { fullname, email, password },
        httpOptions
      )
      .pipe(
        map((user: any) => {
          localStorage.setItem('user', JSON.stringify(user))
          this.router.navigateByUrl('/dashboard');
        })
      );
  }

  logout(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http
      .post<any>(
        `${environment.apiUrl}/auth/logout`,
        { token: refreshToken },
        httpOptions
      )
      .pipe(
        map((message: any) => {
          if (JSON.stringify(message).includes('Success')) {
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
          }
          return message;
        })
      );
  }
}
