import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesRoutingModule } from './expenses-routing.module';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastComponent } from '../shared/toast-notification/toast/toast.component';
import { ToasterComponent } from '../shared/toast-notification/toaster/toaster.component';


@NgModule({
  declarations: [AddExpenseComponent, ToastComponent,
    ToasterComponent],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [  
    MatDatepickerModule
  ],
})
export class ExpensesModule { }
