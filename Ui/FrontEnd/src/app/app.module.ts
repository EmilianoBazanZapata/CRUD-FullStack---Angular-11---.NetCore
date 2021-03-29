import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartamentComponent } from './Components/departament/departament.component';
import { ShowDepComponent } from './Components/Departament/show-dep/show-dep.component';
import { AddEditComponent } from './Components/Departament/add-edit/add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartamentComponent,
    ShowDepComponent,
    AddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
