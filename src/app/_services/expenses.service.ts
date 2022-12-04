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
      const token = localStorage.getItem('accessToken')
      const headers = {'content-type': 'application/json', 'Authorization': `Bearer ${token}` }
       expenses$ = this.http.get<any>(this.endpoint,{'headers':headers}).pipe(shareReplay(this.cache_size))
      this.expensesCacheService.setValue(expenses$)
    }
    return expenses$;
  }
}
