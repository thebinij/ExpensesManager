import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, shareReplay } from 'rxjs';
import { Stock } from 'src/app/shared/schemas/interface';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private _stocksData$ = new BehaviorSubject<void>(undefined);
  constructor(private http: HttpClient) {}

  apiRequest$ = this.http.get<any[]>(`${environment.apiUrl}/stocks`,httpOptions).pipe(map((value:any)=>{
    console.log('getting data from server');
    return value?.data.map((stocks:any)=>({
      ...stocks,
      timeStamp: new Date().toISOString()
    }))
  }))

  public stocks$ = this._stocksData$.pipe(
    mergeMap(() => this.apiRequest$),
    shareReplay(1)
  );

  updateData() {
    console.log('refresh is called')
    this._stocksData$.next();
  }

  addNewStock(payload:Stock){
   const body = JSON.stringify( payload );
   const endPoint = payload.actionType == 'Buy' ? "stocks-purchases" : "stocks-sold"
   return this.http.post<any>(
    `${environment.apiUrl}/${endPoint}`,body,httpOptions )
}
}
