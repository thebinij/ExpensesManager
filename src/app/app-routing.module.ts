import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guards/login.guard';
import { SignupComponent } from './signup/signup.component';
import { NavigationComponent } from './_layout/navigation/navigation.component';
import { AssetsComponent } from './assets/assets.component';

const routes: Routes = [
  // App routes 
  {
    path: '',
    component: NavigationComponent,
    canActivate:[LoginGuard],
    children:[
    { path: '', component: DashboardComponent },
    { path: 'assets',  loadChildren:()=> import('./assets/assets.module').then((m)=> m.AssetsModule)},
    { path: 'dashboard', redirectTo: '', pathMatch: 'full' },
    { path: 'expenses', loadChildren:()=> import('./expenses/expenses.module').then((m)=> m.ExpensesModule) },
    { path: 'reports', loadChildren:()=> import('./reports/reports.module').then((m)=> m.ReportsModule)}
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
