// defines the routes of the application, each route contains a path and associated component

import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthGuard} from '@/guards/auth.guards';
import {ListsComponent} from './components/lists/lists.component';
import {ListComponent} from './components/list/list.component';
import {SectionTitle} from './enums/section-title.enum';
import {MailSenderComponent} from "@/components/mail-sender/mail-sender.component";


export const ROUTES: Routes = [{
  path: '',
  component: HomeComponent,
  canActivate: [AuthGuard],
  children: [{
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'lists',
    component: ListsComponent,
    data: {section: SectionTitle.Lists}
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
  }]
},

// otherwise redirect to home
  {path: '**', redirectTo: ''}
];
