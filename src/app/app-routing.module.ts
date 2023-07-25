import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { DonateComponent } from './donate/donate.component';

const routes: Routes = [
  {
    path: '', 
    pathMatch: 'full', 
    component: HomeComponent
  }, 
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'donate',
    component: DonateComponent
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
