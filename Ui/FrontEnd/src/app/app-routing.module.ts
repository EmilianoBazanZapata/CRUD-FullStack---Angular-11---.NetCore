import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent} from './Components/employee/employee.component';
import { DepartamentComponent } from './Components/departament/departament.component';

const routes: Routes = [
  {path:'Employee', component:EmployeeComponent},
  {path:'Departament',component:DepartamentComponent},
  {path:'',component:DepartamentComponent},
  {path:'**',redirectTo:'Employee', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
