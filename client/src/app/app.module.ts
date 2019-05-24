import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AlertComponent} from './components/alert/alert.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {ROUTES} from '@/app.routes'
import {HttpService} from './http.service';
import {UserService} from './services/user.service';
import {LoadingComponent} from './components/loading/loading.component';
import {LocalStorageService} from './services/local-storage.service';
import {ChartComponent} from './components/chart/chart.component';
import {DataService} from './services/data.service';
import {HeaderComponent} from './components/header/header.component';
import {MenuComponent} from './components/menu/menu.component';
import {PanelComponent} from './components/panel/panel.component';
import {MailSenderComponent} from './components/mail-sender/mail-sender.component';
import {ListsComponent} from './components/lists/lists.component';
import {ListService} from './components/lists/list.service';
import {ListComponent} from './components/list/list.component';
import {TitleBarComponent} from './components/title-bar/title-bar.component';
import {WidgetComponent} from './components/widget/widget.component';
import {ConfirmationComponent} from './components/confirmation/confirmation.component';
import {ConfirmationService} from '@/components/confirmation/confirmation.service';
import {EmailService} from '@/components/mail-sender/email.service';

const appRoutes: Routes = ROUTES;

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LoadingComponent,
    ChartComponent,
    HeaderComponent,
    MenuComponent,
    PanelComponent,
    MailSenderComponent,
    ListsComponent,
    ListComponent,
    TitleBarComponent,
    WidgetComponent,
    ConfirmationComponent,
  ],
  providers: [
    HttpService,
    UserService,
    LocalStorageService,
    DataService,
    ListService,
    ConfirmationService,
    EmailService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
