import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireModule } from '@angular/fire';

import { environment } from '../../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  exports: [
    HeaderComponent, //これでAppComponentで利用できるようになる
  ],
})
export class CoreModule { }
