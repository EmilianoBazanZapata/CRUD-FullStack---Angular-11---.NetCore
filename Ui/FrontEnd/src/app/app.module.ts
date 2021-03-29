import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {  HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartamentComponent } from './Components/departament/departament.component';
import { ShowDepComponent } from './Components/Departament/show-dep/show-dep.component';
import { AddEditComponent } from './Components/Departament/add-edit/add-edit.component';
import { EmployeeComponent } from './Components/employee/employee.component';
import { ShowEmpComponent } from './Components/Employee/show-emp/show-emp.component';
import { AddEditEmpComponent } from './Components/Employee/add-edit-emp/add-edit-emp.component';
import {SharedService} from './Services/shared.service';

@NgModule({
  declarations: [
    AppComponent,
    DepartamentComponent,
    ShowDepComponent,
    AddEditComponent,
    EmployeeComponent,
    ShowEmpComponent,
    AddEditEmpComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule
  ],
    providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
