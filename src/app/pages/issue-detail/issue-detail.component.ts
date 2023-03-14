import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit{
  public issueDetail:any;
  public modalType:string="Edit"

  constructor(private route:ActivatedRoute){


  }



  ngOnInit(): void {

    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id=params.get("id")
      // use this id to fetch issue detail using get request
      console.log(id)
    })
    // on component initialization we will fetch this data from the api
    const issueDetailData={
      "id": 11,
      "created_at": "2018-12-18T04:43:10.791467Z",
      "updated_at": "2019-02-12T04:48:42.950006Z",
      "title": "Book Without Executive Radio Nation Team",
      "description": "Institution office forward way result raise. Organization low far safe",
      "status": "Resolved",
      "severity": 2,
      "due_date": null,
      "type": "Bug",
      "project": 3,
      "assignee": 4
      }
      this.issueDetail=issueDetailData;
      
  }
}
