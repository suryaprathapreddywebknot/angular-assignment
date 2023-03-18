import { Component, Input, OnChanges, OnInit ,SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnChanges,OnInit {

  @Input()public issues:any;
  @Input()public issueState:any;
  @Input()public users:any;
  @Input()public usedIn:any
  
  constructor( private _route:Router){}

  ngOnInit(): void {
    // console.log(window.location)
  }

  ngOnChanges(changes:SimpleChanges){
    // console.log(changes)
    // if(changes['issues']?.firstChange) return
    let currentIssues=changes['issues']?.currentValue
    this.issues=currentIssues
  }

  issueDetailHandler(issue:any){
    this._route.navigate(["/issues",issue.id])
  }




}
