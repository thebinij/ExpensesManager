import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from 'src/app/shared/schemas/interface';


@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {}
  private token = localStorage.getItem('accessToken')
  private headers = {'content-type': 'application/json', 'Authorization': `Bearer ${this.token}` }  

  getStock():Observable<any>{
    return this.http.get<any>("https://binij-web-server.netlify.app/.netlify/functions/wealthmanager/stocks",{'headers':this.headers})
  }

  addNewStock(payload:Stock){
    const body = JSON.stringify( payload );
    const endpoint = payload.actionType == 'Buy' ? "https://binij-web-server.netlify.app/.netlify/functions/wealthmanager/stocks-purchases" :  payload.actionType == 'Sell' ?  "https://binij-web-server.netlify.app/.netlify/functions/wealthmanager/stocks-sold" : ''
    const response= this.http.post<any>(
      endpoint,
      body,{'headers':this.headers});
      return response;
  }
}
