import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { DonationEditComponent } from "./donation-edit/donation-edit.component";

import { loggedUserGuard } from "../guards/logged-user.guard";
import { notLoggedUserGuard } from "../guards/not-logged-user.guard";


const routes: Routes = [
    {
        path: 'users',
        children: [
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [loggedUserGuard()]
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [loggedUserGuard()]
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [notLoggedUserGuard()]
            },
            {
                path: 'edit',
                component: DonationEditComponent,
                canActivate: [notLoggedUserGuard()]
            },
        ]
    }
];





@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }