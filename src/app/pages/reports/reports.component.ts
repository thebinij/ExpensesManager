import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Report } from './reports';
import { ReportsService } from '../../_services/reports.service';

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
  preFetchReports$:Observable<Report[]>  = this.activatedroute.data.pipe(map(x => x['reports']))

  constructor(private reportservice: ReportsService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
  
  }
 

  toggle(){
    this.hideExpenses =!this.hideExpenses;
  }

}
