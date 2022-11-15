import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/login.guard';
import { NavigationComponent } from './_layout/navigation/navigation.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  // App routes 
  {
    path: '',
    component: NavigationComponent,
    children:[{ path: 'dashboard', component: DashboardComponent, canActivate:[LoginGuard] },
    { path: 'expenses', loadChildren:()=> import('./expenses/expenses.module').then((m)=> m.ExpensesModule), canActivate:[LoginGuard] },
    { path: 'reports', loadChildren:()=> import('./reports/reports.module').then((m)=> m.ReportsModule),canActivate:[LoginGuard]}
    ]
  },
  // Auth routes
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // Not Found routes
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
