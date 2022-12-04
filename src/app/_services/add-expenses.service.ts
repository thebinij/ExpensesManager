import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../pages/expenses/expenses';

@Injectable({
  providedIn: 'root',
})
export class AddExpensesService {
  constructor(private http: HttpClient) {}

  addExpense(payload:Expense) {
    const token = localStorage.getItem('accessToken')
    const headers = {'content-type': 'application/json', 'Authorization': `Bearer ${token}` }  
    const body = JSON.stringify( payload );
    const response= this.http.post<any>(
      'https://binij-web-server.netlify.app/.netlify/functions/wealthmanager/expenses',
      body,{'headers':headers});
  
      return response;
  }
}
