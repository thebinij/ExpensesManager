import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Report } from '../reports/reports';
import { ReportsService } from '../reports/reports.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsGuard implements Resolve<Report[]> {
  constructor(private reportservice: ReportsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Report[] | Observable<Report[]> | Promise<Report[]> {
    return this.reportservice.getReports();
  }
}
