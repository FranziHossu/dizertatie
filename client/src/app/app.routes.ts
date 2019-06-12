// defines the routes of the application, each route contains a path and associated component

import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthGuard} from '@/guards/auth.guards';
import {ListsComponent} from './components/lists/lists.component';
import {ListComponent} from './components/list/list.component';
import {SectionTitle} from './enums/section-title.enum';
import {MailSenderComponent} from '@/components/mail-sender/mail-sender.component';
import {EmailsComponent} from '@/components/emails/emails.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {ProfileComponent} from '@/components/profile/profile.component';
import {ResetPasswordComponent} from '@/components/reset-password/reset-password.component';

export const ROUTES: Routes = [{
  path: '',
  component: HomeComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component: MainPageComponent
  }, {
    path: 'lists',
    component: ListsComponent,
    data: {section: SectionTitle.Lists}
  }, {
    path: 'profile',
    component: ProfileComponent,
    data: {section: SectionTitle.Profile}
  }, {
    path: 'list/create',
    component: ListComponent,
    data: {section: SectionTitle.CreateList}
  }, {
    path: 'list/edit/:id',
    component: ListComponent,
    data: {section: SectionTitle.UpdateList}
  }, {
    path: 'email/create',
    component: MailSenderComponent,
    data: {section: SectionTitle.CreateEmail}
  }, {
    path: 'email/view/:id',
    component: MailSenderComponent,
    data: {section: SectionTitle.ViewEmail}
  }, {
    path: 'emails',
    component: EmailsComponent,
    data: {section: SectionTitle.Emails}
  }]
}, {
  path: 'password/:token',
  component: ResetPasswordComponent,
  data: {section: 0}
}, {
  path: 'confirmation/:token',
  component: ResetPasswordComponent,
  data: {section: 1}
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
},

// otherwise redirect to home
  {path: '**', redirectTo: ''}
];
