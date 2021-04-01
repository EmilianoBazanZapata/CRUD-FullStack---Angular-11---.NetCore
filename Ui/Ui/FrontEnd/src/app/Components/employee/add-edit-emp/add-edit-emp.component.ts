import { Component, Input, OnInit , Output ,EventEmitter} from '@angular/core';
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
  @Output() Actualizar = new EventEmitter<boolean>();

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
      employeeId: this.EmployeeId,
      employee_Name: this.EmployeeName,
      dateOfJoining: this.DateOfJoining,
      departament: this.Departament,
      photo_File_Name: this.PhotoFileName
    }
    this._SharedService.AddEmployee(val).subscribe(data =>
      {
        alert(data.toString())
        this.Actualizar.emit(true);
      });
  }
  //metodo para actualizar un empleado
  UpdateEmployee()
  {
    var val =
    {
      employeeId: this.EmployeeId,
      employee_Name: this.EmployeeName,
      dateOfJoining: this.DateOfJoining,
      departament: this.Departament,
      photo_File_Name: this.PhotoFileName
    }
    this._SharedService.UpdateEmployee(val).subscribe(data =>
      {
        alert(data.toString())
        this.Actualizar.emit(true);
      });
  }

  //motodo para subir una foto
  UploadPhoto(event)
  {
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadedFile',file,file.name);

    this._SharedService.UploadPhoto(formData).subscribe((data:any)=>
      {
        this.PhotoFileName  = data.toString();
        this.PhotoFilePath = this._SharedService.PhotoUrl + this.PhotoFileName;

      })
  }
}
