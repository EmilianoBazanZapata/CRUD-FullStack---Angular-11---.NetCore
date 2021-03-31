import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {


  @Input() variable = false;


  DepartamentList: any = [];
  ModalTitle: string;
  ActivateAddEditDepComp: boolean;
  dep: any;
  ModalRef: BsModalRef;
  constructor(private _SharedServise: SharedService,
    private _ModalService: BsModalService) { }


  ngOnInit(): void {
    this.RefreshDepList();
  }
  RefreshDepList() {
    this._SharedServise.GetDepList().subscribe(data => {
      this.DepartamentList = data;
    })
  }
  //abrir modal para agregar 
  OpenModal(template: TemplateRef<any>) {
    this.ActivateAddEditDepComp = true;
    this.dep =
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
    this.dep = item;
    this.ModalTitle = "Edit Departament"
    this.ModalRef = this._ModalService.show(template);
  }
  //Elimino un Departamento
  DeleteDep(val)
  {
    if(confirm('Are you Sure ??'))
    {
      console.log(val);
      this._SharedServise.DeleteDepartament(val).subscribe(data =>
        {
          alert(data.toString());
          this.RefreshDepList();
        })
    }
  }
  //actualizo el listado
  actualizar(val: boolean) {
    if (val === true) {
      this.RefreshDepList();
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
