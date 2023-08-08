import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { DonateComponent } from './donate/donate.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AboutUsComponent } from './shared/about-us/about-us.component';

import { notLoggedUserGuard } from './guards/not-logged-user.guard';

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
    component: DonateComponent,
    canActivate: [notLoggedUserGuard()]
  },
  {
    path: 'catalog',
    component: CatalogComponent,
    canActivate: [notLoggedUserGuard()]
  },
  {
    path: 'about',
    component: AboutUsComponent
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
