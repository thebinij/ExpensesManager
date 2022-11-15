import { Component, OnInit } from '@angular/core';
import { Expense } from './expenses';
import { ExpensesService } from './expenses.service';
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  errorMessage: any;
  options={
    page: 1,
  pageSize: 8};
  constructor(private expenseservice: ExpensesService) { }
  totalExpenses:Expense[] | undefined;
  ngOnInit(): void {
    this.expenseservice.getExpenses().subscribe({
      next: data => {
          this.totalExpenses = data[Object.keys(data)[0]]
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
  }
  )
  }
  get numbers(): number[] {
    return [1,2]
    // const limit = Math.ceil((this.totalExpenses ) / this.options.pageSize);
    // return Array.from({ length: limit }, (_, i) => i + 1);
  }
  
  next() {
    this.options.page++;
    console.log('next page')
    // this.expenseservice.getExpenses();
  }
  
  prev() {
    this.options.page--;
    console.log('prev page')
    // this.expenseservice.getExpenses();
  }
  to(page: number) {
    this.options.page = page;
    console.log('to page')
// this.expenseservice.getExpenses();
  }
  }

