import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Expense } from '../expenses';

@Injectable({
  providedIn: 'root',
})
export class AddExpensesService {
  constructor(private http: HttpClient) {}

  addExpense(payload:Expense) {
    const headers = { 'access-control-allow-origin': '*',"Access-Control-Allow-Headers":"*" }
    const body = { payload };
    return this.http.post<any>(
      'https://binij-web-server.netlify.app/.netlify/functions/wealthmanager/expenses',
      body,{'headers':headers}
    );
  }
}
