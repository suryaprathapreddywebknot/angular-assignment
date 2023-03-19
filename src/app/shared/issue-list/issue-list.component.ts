import { Component, Input, OnChanges, OnInit ,SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Iissue } from 'src/app/core/interfaces/interfaces';


@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnChanges,OnInit {

  @Input()public issues:any;
  @Input()public issueState:any;
  @Input()public users:any;
  @Input()public usedIn:any;
  @Output() itemDropped = new EventEmitter<CdkDragDrop<any[]>>();
  
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
