import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsGuard } from '../../guards/reports.guard';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  { path: '', component: ReportsComponent, resolve:{ reports:ReportsGuard }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
