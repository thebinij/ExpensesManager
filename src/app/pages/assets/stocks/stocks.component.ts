import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/custom-date-format/my-date-format';
import { Stock } from 'src/app/shared/schemas/interface';
import { AuthInterceptor } from 'src/app/_helpers/auth.interceptor';
import { StockService } from '../../../_services/stock.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true}
  ],
})
export class StocksComponent implements OnInit {

  newStock: Stock = {
    date: new Date(),
    actionType: "Buy",
    stockType: '',
    ticker: '',
    quantity: null,
    charges:null,
}
totalStocks:Stock[] = []

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.stocks$.subscribe({
      next:response=>{
        this.totalStocks =  this.fixStockData(response)
      }
    })
  }

  fixStockData(data:any[]){
    let alteredData:any[] = [];
    for(let i = 0;i< data?.length; i++){
      let currentIndex =alteredData.findIndex(s=>s['ticker']==data[i].ticker)
      if(currentIndex>=0){
        if(data[i].actionType=='Buy'){
          const numerator = (alteredData[currentIndex].costPrice * Math.abs(alteredData[currentIndex].quantity) + data[i].costPrice*data[i].quantity);
          const denominator = (Math.abs(alteredData[currentIndex].quantity)+data[i].quantity)
          alteredData[currentIndex].costPrice = parseFloat((numerator/denominator).toFixed(4));
          alteredData[currentIndex].quantity += data[i].quantity;
        }else if(data[i].actionType=='Sell'){
          alteredData[currentIndex].quantity -= data[i].quantity
        }
          
      }else{
        if(data[i].actionType=='Buy'){{
          alteredData.push({ticker: data[i].ticker, quantity: data[i].quantity, costPrice:data[i].costPrice})
        }
      }else if(data[i].actionType=='Sell'){
        alteredData.push({ticker: data[i].ticker, quantity: -data[i].quantity, costPrice:0})
        }
      }
    }
    return alteredData;
  }

  createNewStock(){
    this.stockService.addNewStock(this.newStock).subscribe({
      next: data =>{
        console.log(data)
      },
      error: error =>{
        console.error("There was an error", error)
      }
    })
    this.newStock = {
      date: new Date(),
      ticker: '',
      actionType: 'Buy',
      quantity: null,
      charges:null,

    };
  
  }

}
