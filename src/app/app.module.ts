import { RegistrationImageService } from './services/registration-image.service';

import { PeopleService } from './services/people.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// tslint:disable-next-line:no-trailing-whitespace
import { 
  MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule
} from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';

import { FlexLayoutModule } from '@angular/flex-layout';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { AuthenticationLayoutComponent } from './layouts/authentication-layout/authentication-layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PeopleComponent } from './admin/people/people.component';
import { BreadcrumComponent } from './breadcrum/breadcrum.component';
import { PeopleFormComponent } from './admin/people-form/people-form.component';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { CommonModule } from '@angular/common';
import { PeopleProfileComponent } from './admin/people-profile/people-profile.component';
import { BasicRegistrationFormComponent } from './admin/people-form/basic-registration-form/basic-registration-form.component';
import { ResponsiveLayoutService } from './services/responsive-layout.service';
import { ProfileMainComponent } from './admin/people-profile/profile-main/profile-main.component';
import { ProfileFamilyComponent } from './admin/people-profile/profile-family/profile-family.component';
import { ProfileContactComponent } from './admin/people-profile/profile-contact/profile-contact.component';
import { ProfileDemographicsComponent } from './admin/people-profile/profile-demographics/profile-demographics.component';
import { ProfileEducationWorkComponent } from './admin/people-profile/profile-education-work/profile-education-work.component';
import { ProfileOtherComponent } from './admin/people-profile/profile-other/profile-other.component';
import { ProfileIntroComponent } from './admin/people-profile/profile-intro/profile-intro.component';
import { SweetAlertService } from './services/sweet-alert.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PublicLayoutComponent,
    AuthenticationLayoutComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    PeopleComponent,
    BreadcrumComponent,
    PeopleFormComponent,
    DropZoneDirective,
    PeopleProfileComponent,
    BasicRegistrationFormComponent,
    ProfileMainComponent,
    ProfileFamilyComponent,
    ProfileContactComponent,
    ProfileDemographicsComponent,
    ProfileEducationWorkComponent,
    ProfileOtherComponent,
    ProfileIntroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    PerfectScrollbarModule,
    FlexLayoutModule,

    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),

    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule
  ],
  providers: [
    PeopleService,
    RegistrationImageService,
    SweetAlertService,
    ResponsiveLayoutService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
