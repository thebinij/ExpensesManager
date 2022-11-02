import { Component, OnInit } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../shared/custom-date-format/my-date-format';
import { Expense } from '../expenses';
import { AddExpensesService } from './add-expenses.service';


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS} 
  ]
})
export class AddExpenseComponent implements OnInit {

  successMessage = ''
  newExpense:Expense ={
    date: new Date(),
    type:'',
    method:'',
    description:'',
    amount: 0
  };
  errorMessage: any;
  expenseId: any;

  constructor(private addExpensesService:AddExpensesService) { }

  ngOnInit(): void {  }
  createNewExpenses(){
    console.log('Submitted!!')
    this.successMessage="Success"
    this.addExpensesService.addExpense(this.newExpense).subscribe({
      next: data => {
       console.log(data)
       this.successMessage="Success"
    },
    error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
    }
    })
    this.newExpense = {
      date: new Date(),
      type:'',
      method:'',
      description:'',
      amount: 0
    };
  }
}
