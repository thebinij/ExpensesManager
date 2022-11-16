import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksComponent } from './stocks/stocks.component';
import { AssetsRoutingModule } from './assets-routing.module';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [StocksComponent],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [  
    MatDatepickerModule
  ],
})
export class AssetsModule { }
