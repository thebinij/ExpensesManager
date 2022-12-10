import {Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, mergeMap, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expense } from '../_models/interface';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private _expensesData$ = new BehaviorSubject<any[]>([]);
  private _token = this.authService.getAuthToken();


  constructor( private http: HttpClient,private authService: AuthService) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization':`Bearer ${this._token}` }),
  };

   apiRequest$ = this.http.get<any[]>(`${environment.apiUrl}/expenses`, this.httpOptions).pipe(map((value:any)=>{
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
    this._expensesData$.next([]);
  }

  addExpense(payload:Expense) {
  const body = JSON.stringify( payload );


 return this.http.post<any>(
      `${environment.apiUrl}/expenses`,body,this.httpOptions ).pipe(tap(addedExpense => {
        this._expensesData$.next([...this._expensesData$.getValue(), addedExpense])
      }))
    }


}
