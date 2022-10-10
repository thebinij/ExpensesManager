import { Component, OnInit } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../shared/custom-date-format/my-date-format';
import { Expense } from '../expenses';

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
    Date: new Date(),
    Type:'',
    Method:'',
    Description:'',
    Amount: 0
  };

  constructor() { }

  ngOnInit(): void {
  }
  AddExpense(){
    console.log('Submitted!!')
    this.successMessage="Success"
    this.newExpense = {
      Date: new Date(),
      Type:'',
      Method:'',
      Description:'',
      Amount: 0
    };
  }

}
