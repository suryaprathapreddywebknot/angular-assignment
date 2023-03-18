import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit{
  public issueDetail:any;
  public modalType:string="Edit";
  public assignee:any;
  public assignedBy:any;
  public createdAt:any;
  public updatedAt:any;
  public isFetching=false

  constructor(private route:ActivatedRoute,private _service:UserService){


  }



  ngOnInit(): void {
    this.isFetching=true
    // console.log('datail page is initiated')

    this.route.paramMap.subscribe((params:ParamMap)=>{
      let issueId=params.get("id")
      
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      
      // use this id to fetch issue detail using get request
      this._service.getIssueDetail(issueId).subscribe(data=>{

        
        this.issueDetail=data
        let createdDate=new Date(this.issueDetail.created_at)
        this.createdAt=`${createdDate.getDate()} ${months[createdDate.getMonth()]} ${createdDate.getFullYear()}`
        let updatedDate=new Date(this.issueDetail.updated_at)
        this.updatedAt=`${updatedDate.getDate()} ${months[updatedDate.getMonth()]} ${updatedDate.getFullYear()}`
      },()=>{},()=>{
        this._service.getUser(this.issueDetail.assignee).subscribe(data=>{
          this.assignee=data.first_name+' '+data.last_name
        })
        this._service.getUser(this.issueDetail.created_by).subscribe(data=>{
          this.assignedBy=data.first_name+" "+data.last_name
        },()=>{},()=>{this.isFetching=false})
      })
      

    })
    
      
  }
}
