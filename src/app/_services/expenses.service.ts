import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { ExpensesCacheService } from './expenses-cache.service';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {

  readonly cache_size = 1;

  constructor(private http: HttpClient, private expensesCacheService: ExpensesCacheService) {}

  getExpenses(): Observable<any> {
    let expenses$ = this.expensesCacheService.getValue();
    console.log('cached:', expenses$)

    if (!expenses$) {
       expenses$ = this.http.get<any>(`${environment.apiUrl}/expenses`,httpOptions).pipe(shareReplay(this.cache_size))
      this.expensesCacheService.setValue(expenses$)
    }
    return expenses$;
  }
}
