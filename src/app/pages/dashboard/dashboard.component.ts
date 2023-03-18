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
  public dashboard="DASHBOARD"

  constructor(private _service: UserService) {}

  ngOnInit(): void {
    this.fetchDates()
    this.isFetching=true
    this._service.getUserIssues().subscribe(
      (data) => {
        this.issues = data;
      },
      () => {},
      () => {
        let dummyIssues = JSON.parse(JSON.stringify(this.issues));
        dummyIssues.sort((a: any, b: any) => {
          new Date(b.updated_at).valueOf() - new Date(a.updated_at).valueOf();
        });
        this.recentlyUpdatedIssues = dummyIssues.slice(0, 4);
        this.highPriorityIssues = dummyIssues
          .filter((ele: any) => ele.priority == 'HIGH')
          .slice(0, 4);

        this.isFetching=false
      }
    );
    // console.log(this.issues)
    this._service.getUsers().subscribe((data) => (this.users = data));
    // this.highPriorityIssues=this.issues.filter(ele=>ele.priority=="HIGH")
  }

fetchDates(){
  const currentDate = new Date();

// Get the last month
const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
const lastWeekEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() - 1);
const lastWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7 - currentDate.getDay());
console.log( lastMonth.toISOString() , currentDate.toISOString());
}


}
