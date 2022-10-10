import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  userName = 'Binij Shrestha'
  listOfExpenses = ['Utilities', 'Food and Groceries', 'Personal', 'HouseHold', 'Gifts', 'Interest', 'Travel and Vacations']
  role = 'User'
  totalExpenses = 4999

  hideExpenses = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.hideExpenses =!this.hideExpenses;
  }

}
