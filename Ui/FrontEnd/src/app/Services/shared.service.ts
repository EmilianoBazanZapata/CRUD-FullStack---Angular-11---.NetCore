import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly ApiUrl = "https://localhost:5001/api";
  readonly PhotoUrl = "https://localhost:5001/Photos";

  constructor(private http:HttpClient) 
  {

  }
  //obtener el listado de departamentos
  GetDepList():Observable<any[]>
  {
    return this.http.get<any>(this.ApiUrl + '/Departament');
  }
  //metodo para agregar un departamento
  AddDepartament(val:any)
  {
    return  this.http.post(this.ApiUrl +'/Departament',val);
  }

}
