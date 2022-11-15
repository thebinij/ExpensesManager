import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportsComponent } from './reports/reports.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormsModule } from '@angular/forms';
import { ExpensesComponent } from './expenses/expenses.component';
import { LoginComponent } from './login/login.component';
import { EmailValidatorDirective } from './shared/email-validator/email-validator.directive';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './_layout/navigation/navigation.component';
import { SignupComponent } from './signup/signup.component';
import { ToastComponent } from './shared/toast-notification/toast/toast.component';
import { ToasterComponent } from './shared/toast-notification/toaster/toaster.component';


@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent,
    DashboardComponent,
    NotfoundComponent,
    ExpensesComponent,
    LoginComponent,
    EmailValidatorDirective,
    NavigationComponent,
    SignupComponent,
    ToastComponent,
    ToasterComponent
      ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
