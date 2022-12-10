import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { EventTypes } from 'src/app/shared/toast-notification/models/event-types';
import { ToastService } from 'src/app/shared/toast-notification/service/toast.service';
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from '../../../shared/custom-date-format/my-date-format';
import { ExpensesService } from 'src/app/_services/expenses.service';
import { Expense } from 'src/app/_models/interface';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class AddExpenseComponent  implements OnInit {
  newExpense: Expense = {
    date: new Date(),
    type: '',
    method: '',
    description: '',
    amount: 0,
  };
  errorMessage: any;
  expenseId: any;
  isLoading: boolean;

  constructor(
    private addExpensesService: ExpensesService,
    private toastService: ToastService,
    private authService: AuthService
  ) {
    this.isLoading = false;
  }

  ngOnInit(): void {}

  createNewExpenses() {
    this.isLoading = true;
    this.addExpensesService.addExpense(this.newExpense).subscribe({
      next: (data) => {
        console.log(data);
        this.showToast(EventTypes.Success);
        this.isLoading =false;

      },
      error: (error) => {
        this.errorMessage = error.message;
        if(error.status=== 403){
       
          this.authService.logout().subscribe({
            next: (data) => {
              console.log('loging out')
            },
            error: (error) => {
              console.error('There was an error!', error);
            }
         
          })
        } 
        console.error('There was an error! Code:', error.status);
        this.showToast(EventTypes.Error);
        this.isLoading =false;
      },
    });

    this.newExpense = {
      date: new Date(),
      type: '',
      method: '',
      description: '',
      amount: 0,
    };
  }

  showToast(type: EventTypes) {
    switch (type) {
      case EventTypes.Success:
        this.toastService.showSuccessToast('Success', 'New Expenses Added!');
        break;
      case EventTypes.Error:
        this.toastService.showErrorToast('Error', 'Something went wrong!');
        break;
      default:
        break;
    }
  }
}
