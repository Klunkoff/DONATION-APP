import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { DonateComponent } from './donate/donate.component';
import { CatalogComponent } from './catalog/catalog.component';
import { environment } from 'src/environments/environments';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DonateComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule, 
    MatCardModule,
    SharedModule,
    CoreModule,
    UserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
