import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseGuard } from '../../guards/expense.guard';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExpensesComponent } from './expenses.component';

const routes: Routes = [
  { path: '', component: ExpensesComponent, canActivateChild: [ExpenseGuard], children: [
    { path: 'add-expense', component: AddExpenseComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
