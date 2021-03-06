import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private _SharedService: SharedService,
    private _ModalService: BsModalService) { }

  EmployeeList: any[];
  ModalTitle: string;
  ActivateAddEditDepComp: boolean;
  emp: any;
  ModalRef: BsModalRef;
  EmployeeSearch =  '';
  ngOnInit(): void {
    this.RefreshEmpList();
  }

  RefreshEmpList() {
    this._SharedService.GetEmpList().subscribe(data => {
      this.EmployeeList = data;
    });
  }

  EmpListSearch()
  {
    var val = 
    {
      employee_Name : this.EmployeeSearch
    }
    console.log(val);
    this._SharedService.SearchEmplyee(this.EmployeeSearch).subscribe(data=>
      {
        this.EmployeeList = data;
      })
      this.EmployeeSearch = '';
  }

  //abrir modal para agregar 
  OpenModal(template: TemplateRef<any>) {
    this.ActivateAddEditDepComp = true;
    this.emp =
    {
      EMPLOYEE_ID: 0,
      EMPLOYEE_NAME: "",
      DEPARTAMENT: "",
      DATE_OF_JOINING: "",
      PHOTO_FILE: "Anonymous.png"
    }
    this.ModalTitle = "Add Employee"
    this.ModalRef = this._ModalService.show(template);
  }
  //modal para editar
  EditClick(template: TemplateRef<any>, item) {
    this.ActivateAddEditDepComp = true;
    this.emp = item;
    this.ModalTitle = "Edit Employee"
    this.ModalRef = this._ModalService.show(template);
  }
  //Elimino un Departamento
  DeleteDep(val) {
    if (confirm('Are you Sure ??')) {
      console.log(val);
      this._SharedService.DeleteEmployee(val).subscribe(data => {
        alert(data.toString());
        this.RefreshEmpList();
      })
    }
  }
  //actualizo el listado
  actualizar(val: boolean) {
    if (val === true) {
      this.RefreshEmpList();
    }
  }
  //cerrar modal
  Close() {
    if (this.ModalRef) {
      this.ActivateAddEditDepComp = false;
      this.ModalRef.hide();
    }
  }
}
