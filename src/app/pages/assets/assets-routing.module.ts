import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './assets.component';
import { StocksComponent } from './stocks/stocks.component';

const routes: Routes = [
  { path: '', component: AssetsComponent, children: [
    { path: 'stocks', component: StocksComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
