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
  })
  }

}
