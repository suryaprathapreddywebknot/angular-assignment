import { Component, OnInit } from '@angular/core';
import { Iissue } from 'src/app/core/interfaces/interfaces';
import { Iuser } from 'src/app/core/interfaces/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

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
  public mostAssignedUsers: Array<Iuser> = [];
  public mostAssignedUsersDetails:any = [];

  public lastMonth: any = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth() - 1
  ).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  public lastWeekEnd: any = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth(),
    this.currentDate.getDate() - this.currentDate.getDay() - 1
  ).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  public lastWeekStart = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth(),
    this.currentDate.getDate() - 7 - this.currentDate.getDay()
  ).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  constructor(private _service: UserService,private _route:Router) {}

  ngOnInit(): void {
    this.isFetching = true;
    try {

      this._service.getUserIssues().subscribe(
        (data) => {
          this.issues = data;
  
          // implementing logic to get users with most issues assigned
          const assigneeCount = Object.entries(
            this.countOccurrences(data, 'assignee')
          );
          let busyUsers: any = [];
          assigneeCount.sort((a: any, b: any) => b[1] - a[1]);
  
          for (let item of assigneeCount.slice(0, 4)) {
            busyUsers.push(+item[0]);
          }
  
          let users = this.users.filter((ele) => busyUsers.includes(ele.id));
          this.mostAssignedUsers = users;
          let mostAssignedUsersData: any = [];
          this.mostAssignedUsers.forEach((ele) => {
            mostAssignedUsersData.push({
              userObj: ele,
              donePercentage: Math.trunc(
                (this.issues.filter(
                  (issue) => issue.assignee == ele.id && issue.status == 'DONE'
                ).length /
                  this.issues.filter((issue) => issue.assignee == ele.id)
                    .length) *
                  100
              )+'%',
            });
          });
          this.mostAssignedUsersDetails = mostAssignedUsersData;
    
        },
        (error) => {console.log(error)},
        () => {
          let dummyIssues = JSON.parse(JSON.stringify(this.issues));
          dummyIssues.sort(
            (a: any, b: any) =>
              new Date(b.updated_at).valueOf() - new Date(a.updated_at).valueOf()
          );
  
          this.recentlyUpdatedIssues = dummyIssues.slice(0, 4);
          this.highPriorityIssues = dummyIssues
            .filter((ele: any) => ele.priority == 'HIGH')
            .slice(0, 4);
  
          this.isFetching = false;
        }
      );
      this._service.getUsers().subscribe((data) => {
        this.isFetching=true
        this.users = data;},()=>{},()=>{
          this.isFetching=false
        });
      
    } catch (error:any) {
      alert(error.message)
    }
   

  }

  onchange(event: any) {
    let filteredDate = new Date(event.target.value);
    let filteredIssues = this.issues.filter(
      (ele: any) => new Date(ele.updated_at) >= filteredDate
    );
    filteredIssues.sort(
      (a: any, b: any) =>
        new Date(b.updated_at).valueOf() - new Date(a.updated_at).valueOf()
    );
    this.recentlyUpdatedIssues = filteredIssues.slice(0, 4);
    this.highPriorityIssues = filteredIssues
      .filter((ele: any) => (ele.priority = 'HIGH'))
      .slice(0, 4);
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

  onClick(event:any){
    this._route.navigate(["/issues"])
  }

}
