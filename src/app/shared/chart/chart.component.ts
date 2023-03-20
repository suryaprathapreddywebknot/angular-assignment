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

  private chart:am4charts.XYChart;
  public currentDate = new Date();

  constructor(private zone:NgZone){}


  generateData() {
    let lastMonth= new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1
    )
    let issuesCopy=JSON.parse(JSON.stringify(this.issues))

    let recentlyUpdatedFilteredIssues=this.issues.filter((ele:any)=>new Date(ele.updated_at)>=new Date(lastMonth))
    let recentHighPriorityIssues=issuesCopy.filter((ele:any)=>new Date(ele.updated_at)>=new Date(lastMonth) && ele.priority=="HIGH")
    
    recentlyUpdatedFilteredIssues.map((ele:any)=>ele.updated_at=new Date(ele.updated_at).getDate())
    recentHighPriorityIssues.map((ele:any)=>ele.updated_at=new Date(ele.updated_at).getDate())
    let recCount=this.countOccurrences(recentlyUpdatedFilteredIssues,'updated_at')
    let recHighCount=this.countOccurrences(recentHighPriorityIssues,'updated_at')
      let chartData:any=[]
    for(let i=0;i<=31;i++){
      chartData.push(
        {
          day:i,
          value1:recCount[i.toString()],
          value2:recHighCount[i.toString()]
        }
      )
    }

    return chartData
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
     series1.name='Recently Updated Issues'

     let series2 = chart.series.push(new am4charts.LineSeries());
     series2.dataFields.valueY = 'value2';
     series2.dataFields.valueX = 'day';
     series2.stroke = am4core.color('pink');
    series2.name='High Priority Issues'

 
     // Add bullets
     let bullet1 = series1.bullets.push(new am4charts.CircleBullet());
     bullet1.circle.radius = 4;
     bullet1.circle.strokeWidth = 2;
     bullet1.circle.fill = am4core.color('#fff');

     let bullet2 = series2.bullets.push(new am4charts.CircleBullet());
     bullet2.circle.radius = 4;
     bullet2.circle.strokeWidth = 2;
     bullet2.circle.fill = am4core.color('#fff');

     chart.legend = new am4charts.Legend();
// chart.legend.useDefaultMarker = true;
chart.legend.position = "bottom";
chart.legend.align = "center";

     
 
     // Add cursor
     chart.cursor = new am4charts.XYCursor();
 
     // Store the chart instance
     this.chart = chart;
  }

  countOccurrences(arr: any, prop: any) {
    return arr.reduce(function (acc: any, obj: any) {
      let key = obj[prop];
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key]++;
      return acc;
    }, {});
  }



  




  ngOnInit(){
    
   

    // let recentFiltredIssues=this.issues.filter((ele:any)=>new Date(ele.updated_at).toDateString()>=Date.now().toLocaleString())
    // let recentHighPriorityIssues=this.issues.filter((ele:any)=>new Date(ele.updated_at).toDateString()>=lastMonth && ele.priority=="HIGH")
    // console.log(recentFiltredIssues)
    // console.log(recentHighPriorityIssues)
   

    this.createChart()
  }
}
