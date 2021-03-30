import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  DepartamentList:any=[];
  constructor(private _SharedServise : SharedService) { }
  

  ngOnInit(): void {
    this.RefreshDepList();
  }
  RefreshDepList()
  {
    this._SharedServise.GetDepList().subscribe(data=>{
      this.DepartamentList = data;
    })
  }

}
