import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit
 {
  @Input()public users:any;




  ngOnInit(){
    console.log(this.users)
  }
}
