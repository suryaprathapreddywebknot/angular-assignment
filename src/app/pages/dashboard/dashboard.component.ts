import { Component, OnInit } from '@angular/core';
import { Iissue } from 'src/app/core/interfaces/interfaces';
import { Iuser } from 'src/app/core/interfaces/interfaces';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public isFetching = false;
  public issues: Array<Iissue> = [];
  public users: Array<Iuser> = [];
  public recentlyUpdatedIssues: Array<Iissue> = [];
  public highPriorityIssues: Array<Iissue> = [];
  public highPriority = 'HIGH PRIORITY';
  public recent = 'RECENTLY UPDATED';
  public dashboard = 'DASHBOARD';
  public currentDate = new Date();
 

  public lastMonth: any = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth() - 1
  ).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  public lastWeekEnd:any=new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth(),
    this.currentDate.getDate() - this.currentDate.getDay()-1
  ).toLocaleDateString('en-US',{month:'long',day:'numeric'})
  public lastWeekStart= new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth(),
    this.currentDate.getDate() - 7 -this. currentDate.getDay()
  ).toLocaleDateString('en-US',{month:'long',day:'numeric'})

  constructor(private _service: UserService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this._service.getUserIssues().subscribe(
      (data) => {
        this.issues = data;
      },
      () => {},
      () => {
        let dummyIssues=JSON.parse(JSON.stringify(this.issues))
        // console.log(dummyIssues)
        dummyIssues.sort((a:any,b:any)=>new Date(b.updated_at).valueOf()-new Date(a.updated_at).valueOf())
       
        // console.log(dummyIssues)
        this.recentlyUpdatedIssues=dummyIssues.slice(0,4)
        this.highPriorityIssues=dummyIssues.filter((ele:any)=>ele.priority=="HIGH").slice(0,4)

        this.isFetching = false;
      }
    );
    // console.log(this.issues)
    this._service.getUsers().subscribe((data) => (this.users = data));
    // this.highPriorityIssues=this.issues.filter(ele=>ele.priority=="HIGH")
  }

  onchange(event: any) {
    let filteredDate=new Date(event.target.value)
    let filteredIssues=this.issues.filter((ele:any)=>new Date(ele.updated_at)>=filteredDate)
    filteredIssues.sort((a:any,b:any)=>new Date(b.updated_at).valueOf()-new Date(a.updated_at).valueOf())
    this.recentlyUpdatedIssues=filteredIssues.slice(0,4)
    this.highPriorityIssues=filteredIssues.filter((ele:any)=>ele.priority="HIGH").slice(0,4)
  }

  
}
