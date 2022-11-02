import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor(private http: HttpClient) { }
  getExpenses(){
      // const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
      return this.http.get<any>('https://binij-web-server.netlify.app/.netlify/functions/wealth-manager-expenses-get')
  }
}
