import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, mergeMap, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expense } from '../shared/schemas/interface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private _expensesData$ = new BehaviorSubject<void>(undefined);
  constructor(@SkipSelf() private http: HttpClient) {}

   apiRequest$ = this.http.get<any[]>(`${environment.apiUrl}/expenses`,httpOptions).pipe(map((value:any)=>{
    console.log('getting data from server');
    return value?.data.map((expense:any)=>({
      ...expense,
      timeStamp: new Date().toISOString()
    }))
  }))

  public expenses$ = this._expensesData$.pipe(
    mergeMap(() => this.apiRequest$),
    shareReplay(1)
  );

  updateData() {
    console.log('refresh is called')
    this._expensesData$.next();
  }

  addExpense(payload:Expense) {
    const body = JSON.stringify( payload );
    return this.http.post<any>(
      `${environment.apiUrl}/expenses`,body,httpOptions )
      
  }


}
