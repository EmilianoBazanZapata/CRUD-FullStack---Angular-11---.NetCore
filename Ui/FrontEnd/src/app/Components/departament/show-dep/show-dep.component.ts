import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  DepartamentList: any = [];
  ModalTitle: string;
  ActivateAddEditDepComp: boolean;
  dep: any;
  ModalRef:BsModalRef;
  constructor(private _SharedServise: SharedService,
              private _ModalService :BsModalService) { }


  ngOnInit(): void {
    this.RefreshDepList();
  }
  RefreshDepList() {
    this._SharedServise.GetDepList().subscribe(data => {
      this.DepartamentList = data;
    })
  }
  OpenModal(template: TemplateRef<any>) {
    this.ActivateAddEditDepComp=true;
    this.ModalRef = this._ModalService.show(template);
  }
  Close()
  {
    if (this.ModalRef) {
      this.ActivateAddEditDepComp=false;
      this.ModalRef.hide();
   }
  }

}
