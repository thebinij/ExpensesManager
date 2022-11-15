import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../expenses';

@Injectable({
  providedIn: 'root',
})
export class AddExpensesService {
  constructor(private http: HttpClient) {}

  addExpense(payload:Expense) {
    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify( payload );
    return this.http.post<any>(
      'https://binij-web-server.netlify.app/.netlify/functions/wealthmanager/expenses',
      body,{'headers':headers}
    );
  }
}
