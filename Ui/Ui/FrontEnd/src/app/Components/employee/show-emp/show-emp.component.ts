import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private _SharedService : SharedService,
              private _ModalService: BsModalService) { }

  EmployeeList:any[];
  ModalTitle: string;
  ActivateAddEditDepComp: boolean;
  emp: any;
  ModalRef: BsModalRef;
  ngOnInit(): void {
    this.RefreshEmpList();
  }

  RefreshEmpList()
  {
    this._SharedService.GetEmpList().subscribe(data =>
      {
        this.EmployeeList = data;
      });
  }

    //abrir modal para agregar 
    OpenModal(template: TemplateRef<any>) {
      this.ActivateAddEditDepComp = true;
      this.emp =
      {
        deparament_Id: 0,
        departament_Name: ""
      }
      this.ModalTitle = "Add Departament"
      this.ModalRef = this._ModalService.show(template);
    }
    //modal para editar
    EditClick(template: TemplateRef<any>, item) {
      this.ActivateAddEditDepComp = true;
      this.emp = item;
      this.ModalTitle = "Edit Departament"
      this.ModalRef = this._ModalService.show(template);
    }
    //Elimino un Departamento
    DeleteDep(val)
    {
      if(confirm('Are you Sure ??'))
      {
        console.log(val);
        this._SharedService.DeleteDepartament(val).subscribe(data =>
          {
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
