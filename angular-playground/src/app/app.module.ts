import { NgModule } from '@angular/core';

import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { NgFor } from '@angular/common';
import { DropDownComponent } from './drop-down/drop-down.component';
@NgModule({
  declarations: [AppComponent, ProjectListComponent, DropDownComponent],
  imports: [BrowserModule, AppRoutingModule, NgFor],

  providers: [provideClientHydration()],
  bootstrap: [AppComponent],

})
export class AppModule {}

