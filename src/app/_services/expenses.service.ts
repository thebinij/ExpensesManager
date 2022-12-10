import {Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, mergeMap, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expense } from '../shared/schemas/interface';
import { AuthService } from './auth.service';
import { SpinnerService } from './spinner.service';


@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private _expensesData$ = new BehaviorSubject<void>(undefined);
  private _token = this.authService.getAuthToken();


  constructor( private http: HttpClient,private authService: AuthService, private spinnerService: SpinnerService) {}

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
    this._expensesData$.next();
  }

  addExpense(payload:Expense) {
    const body = JSON.stringify( payload );
    const postExpenseObservable = this.http.post<any>(
      `${environment.apiUrl}/expenses`,body,this.httpOptions )
    return this.spinnerService.handleRequest(postExpenseObservable)      
  }


}
