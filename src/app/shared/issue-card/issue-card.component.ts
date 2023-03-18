import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Iuser } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.css']
})
export class IssueCardComponent implements OnInit {
  @Input()public issue:any;
  @Input()public users:any;
  public date:any;
  public assignee:any
  



  


    
    ngOnInit(): void {
      // console.log(this.users)
      const currentassignee=this.users.find((user:any)=>+user.id== +this.issue.assignee)
      this.assignee=currentassignee;
      // logic to set date
      const date=new Date(this.issue.created_at)
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      this.date=`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`

  }

  


}
