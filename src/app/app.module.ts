import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { FormsModule } from '@angular/forms';

import { EmailValidatorDirective } from './shared/email-validator/email-validator.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './pages/signup/signup.component';
import { ToastComponent } from './shared/toast-notification/toast/toast.component';
import { ToasterComponent } from './shared/toast-notification/toaster/toaster.component';
import { NavigationComponent } from './_layout/navigation/navigation.component';
import { AssetsComponent } from './pages/assets/assets.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './_helpers/auth.interceptor';



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
    ToasterComponent,
    AssetsComponent
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
  providers: [   {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
