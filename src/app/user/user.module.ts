import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { DonationEditComponent } from './donation-edit/donation-edit.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DonationEditComponent,
    ProfileEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    UserRoutingModule,
  ]
})

export class UserModule { }
