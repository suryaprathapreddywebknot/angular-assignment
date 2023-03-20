import { Component, Input, OnInit,NgZone,AfterViewInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from "@amcharts/amcharts4/themes/animated"

am4core.useTheme(am4themes_animated)


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit
 {
  @Input()public users:any;
@Input()public issues:any;
// @Input()public highPriorityIssues:any;

  private chart:am4charts.XYChart;
  public currentDate = new Date();

  constructor(private zone:NgZone){}


  generateData() {
    let data = [];
    for (let i = 1; i <= 31; i++) {
      data.push({
        day: i,
        value1: Math.floor(Math.random() * 30),
        value2: Math.floor(Math.random() * 30)
      });
    }
    return data;
  }

  createChart(){

    let chart = am4core.create('line-chart', am4charts.XYChart);
     // Add data
     chart.data = this.generateData();

     // Create axes
     let xAxis = chart.xAxes.push(new am4charts.ValueAxis());
     xAxis.min = 1;
     xAxis.max = 31;
     xAxis.title.text='Day'
     xAxis.renderer.minGridDistance =1;
    //  xAxis.step = 1;
 
     let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
     yAxis.min = 0;
     yAxis.max = 30;
     yAxis.title.text='Issues'
 
     // Create series
     let series1 = chart.series.push(new am4charts.LineSeries());
     series1.dataFields.valueY = 'value1';
     series1.dataFields.valueX = 'day';
     series1.stroke = am4core.color('blue');

     let series2 = chart.series.push(new am4charts.LineSeries());
     series2.dataFields.valueY = 'value2';
     series2.dataFields.valueX = 'day';
     series2.stroke = am4core.color('pink');


 
     // Add bullets
     let bullet1 = series1.bullets.push(new am4charts.CircleBullet());
     bullet1.circle.radius = 4;
     bullet1.circle.strokeWidth = 2;
     bullet1.circle.fill = am4core.color('#fff');

     let bullet2 = series2.bullets.push(new am4charts.CircleBullet());
     bullet2.circle.radius = 4;
     bullet2.circle.strokeWidth = 2;
     bullet2.circle.fill = am4core.color('#fff');

     
 
     // Add cursor
     chart.cursor = new am4charts.XYCursor();
 
     // Store the chart instance
     this.chart = chart;
  }



  




  ngOnInit(){
    
    let lastMonth= new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1
    ).toLocaleDateString();

    let recentFiltredIssues=this.issues.filter((ele:any)=>new Date(ele.updated_at).toDateString()>=Date.now().toLocaleString())
    let recentHighPriorityIssues=this.issues.filter((ele:any)=>new Date(ele.updated_at).toDateString()>=lastMonth && ele.priority=="HIGH")
    // console.log(recentFiltredIssues)
    // console.log(recentHighPriorityIssues)
    let recentData=[]

    this.createChart()
  }
}
