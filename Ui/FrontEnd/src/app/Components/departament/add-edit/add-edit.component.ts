import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';
import { ShowDepComponent } from '../show-dep/show-dep.component';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  @Input() dep: any;
  deparament_Id: string;
  departament_Name: string;
  DepartamentList: any = [];
  constructor(private _SharedService: SharedService,
              private ShowDep:ShowDepComponent)
  {

  }

  ngOnInit(): void {
    this.deparament_Id = this.dep.DEPARTAMENT_ID;
    this.departament_Name = this.dep.DEPARTAMENT_NAME;
  }
  AddDepartament() {
    var val =
    {
      Deparament_Id: this.deparament_Id,
      Departament_Name: this.departament_Name

    }
    this._SharedService.AddDepartament(val).subscribe(data =>
      {
        alert(data.toString());
        this.ShowDep.ngOnInit();
      });
  }
  UpdateDepartament() {
    var val =
    {
      Deparament_Id: this.deparament_Id,
      Departament_Name: this.departament_Name
    }
    this._SharedService.UpdateDepartament(val).subscribe(data =>
      {
        alert(data.toString());
        this.ShowDep.ngOnInit();
      });
      
  }

  RefreshDepList() {
    this._SharedService.GetDepList().subscribe(data => {
      this.DepartamentList = data;
    })
  }
}
