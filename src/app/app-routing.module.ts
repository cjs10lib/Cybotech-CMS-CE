import { PeopleFormComponent } from './admin/people-form/people-form.component';
import { PeopleComponent } from './admin/people/people.component';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleProfileComponent } from './admin/people-profile/people-profile.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'profile/:id',
        component: PeopleProfileComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'people',
        component: PeopleComponent
      },
      {
        path: 'registration/:id',
        component: PeopleFormComponent
      },
      {
        path: 'registration',
        component: PeopleFormComponent
      },
    ]
  }, {
    path: '',
    component: AuthenticationLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }, {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '**',
        component: HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
