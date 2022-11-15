import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { ExpensesCacheService } from './expenses-cache.service';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  readonly endpoint =
    'https://binij-web-server.netlify.app/.netlify/functions/wealthmanager/expenses';
  readonly cache_size = 1;

  constructor(private http: HttpClient, private expensesCacheService: ExpensesCacheService) {}

  getExpenses(): Observable<any> {
    let expenses$ = this.expensesCacheService.getValue();
    console.log('cached:', expenses$)
    if (!expenses$) {
      console.log('called to api')
       //  const headers = { 'content-type': 'application/json'}
    // const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
       expenses$ = this.http.get<any>(this.endpoint).pipe(shareReplay(this.cache_size))
      this.expensesCacheService.setValue(expenses$)
    }
    return expenses$;
  }
}
