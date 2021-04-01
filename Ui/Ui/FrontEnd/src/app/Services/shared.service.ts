import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly ApiUrl = "https://localhost:5001/api";
  readonly PhotoUrl = "https://localhost:5001/Photos/";

  constructor(private http: HttpClient) {

  }
  //metodos para trabajar con DEPARTAMENTOS
  //obtener el listado de departamentos
  GetDepList(): Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/Departament');
  }
  //metodo para agregar un departamento
  AddDepartament(val: any) {
    return this.http.post(this.ApiUrl + '/Departament', val);
  }
  //metodo para actualizar un departamento
  UpdateDepartament(val: any) {
    return this.http.put(this.ApiUrl + '/Departament', val);
  }
  //metodo para eliminar un departamento
  DeleteDepartament(val: any) {
    return this.http.delete(this.ApiUrl + '/Departament/' + val);
  }

  //metodos para trabajar con EMPLEADOS

  //obtener el listado de empleados
  GetEmpList(): Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/Employee');
  }
  //metodo para agregar un empleado
  AddEmployee(val: any) {
    return this.http.post(this.ApiUrl + '/Employee', val);
  }
  //metodo para actualizar un empleado
  UpdateEmployee(val: any) {
    return this.http.put(this.ApiUrl + '/Employee', val);
  }
  //metodo para eliminar un Empleado
  DeleteEmployee(val: any) {
    return this.http.delete(this.ApiUrl + '/Employee/' + val);
  }
  //metodo para buscar empleados
  SearchEmplyee(val :any): Observable<any[]>
  {
    return this.http.get<any>(this.ApiUrl + '/Employee/' + val);
  }

  //metodo para subir una foto 
  UploadPhoto(val:any)
  {
    return this.http.post(this.ApiUrl + '/Employee/SaveFile' , val);
  }
  //metodo para devolver los departamentos dentro de employee
  GetAllDepartamentNames():Observable<any[]>
  {
    return this.http.get<any>(this.ApiUrl+ '/Employee/GetAllDepartamentsNames');
  }
}
