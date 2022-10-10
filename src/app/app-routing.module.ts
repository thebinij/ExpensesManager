import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ReportsComponent } from './reports/reports.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate:[LoginGuard] },
  { path: 'expenses', loadChildren:()=> import('./expenses/expenses.module').then((m)=> m.ExpensesModule), canActivate:[LoginGuard] },
  { path: 'reports', component: ReportsComponent, canActivate:[LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
