import {  Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from './reports';
import { ReportsService } from './reports.service';

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
  today = new Date()
  expenseamount = 1200.022

  hideExpenses = false;

  reports$:Observable<Report[]> = this.reportservice.getReports()

  constructor(private reportservice: ReportsService) { }

  ngOnInit(): void {

  }
 

  toggle(){
    this.hideExpenses =!this.hideExpenses;
  }

}
