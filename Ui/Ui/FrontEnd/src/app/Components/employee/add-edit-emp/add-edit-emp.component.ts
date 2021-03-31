import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  @Input() emp: any;
  EmployeeId: string;
  EmployeeName: string;
  Departament: string;
  DateOfJoining: string;
  PhotoFileName: string;
  PhotoFilePath: string;
  DepartamentList: any = [];

  constructor(private _SharedService: SharedService) { }

  ngOnInit(): void {
    this.LoadDepartamentList();
  }

  LoadDepartamentList() {
    this._SharedService.GetAllDepartamentNames().subscribe((data: any) => {
      this.DepartamentList = data;
      this.EmployeeId = this.emp.EMPLOYEE_ID,
        this.EmployeeName = this.emp.EMPLOYEE_NAME,
        this.Departament = this.emp.DEPARTAMENT,
        this.DateOfJoining = this.emp.DATE_OF_JOINING,
        this.PhotoFileName = this.emp.PHOTO_FILE,
        this.PhotoFilePath = this._SharedService.PhotoUrl + this.PhotoFileName;
    })
  }
  //agregar un empleado
  AddEmployee() {
    var val =
    {
      EMPLOYEE_ID: this.EmployeeId,
      EMPLOYEE_NAME: this.EmployeeName,
      DEPARTAMENT: this.Departament,
      DATE_OF_JOINING: this.DateOfJoining,
      PHOTO_FILE: this.PhotoFileName
    }
    this._SharedService.AddEmployee(val).subscribe(data =>
      {
        alert(data.toString())
      });
  }
  //metodo para actualizar un empleado
  UpdateEmployee()
  {
    var val =
    {
      EMPLOYEE_ID: this.EmployeeId,
      EMPLOYEE_NAME: this.EmployeeName,
      DEPARTAMENT: this.Departament,
      DATE_OF_JOINING: this.DateOfJoining,
      PHOTO_FILE: this.PhotoFileName
    }
    this._SharedService.UpdateEmployee(val.EMPLOYEE_ID).subscribe(data =>
      {
        alert(data.toString())
      });
  }
}
