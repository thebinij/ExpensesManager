import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAuthToken(){
    const accessToken = localStorage.getItem('accessToken')
    return accessToken;
  }

  login(email: string, password: string): Observable<any>  {
   
    return this.http.post<any>(`${environment.apiUrl}/login`, { email, password},httpOptions)
        .pipe(map((user: any) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }));
}

  register(fullname: string, email: string, password: string):Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/signup`, { fullname,
    email,
    password},httpOptions);
}

logout() {
  // remove user from local storage 
  localStorage.removeItem('user');
  this.router.navigate(['/login']);
}
}
