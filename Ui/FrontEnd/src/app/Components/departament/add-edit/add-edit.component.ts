import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  @Input() dep:any;
  deparament_Id: string;
  departament_Name: string;

  constructor(
    
  ) { }

  ngOnInit(): void {
    this.deparament_Id = this.dep.DEPARTAMENT_ID;
    this.departament_Name  =this.dep.DEPARTAMENT_NAME;
  }
  AddDepartament()
  {

  }
  UpdateDepartament()
  {

  }
}
