import { Component, OnInit } from '@angular/core';
import { filter, pipe } from 'rxjs';
import { Iissue, Iuser } from 'src/app/core/interfaces/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})

export class IssuesComponent implements OnInit {

  // public toDoIssues:<Iissue[]>;
  public isFetching=false
  public issues:Array<Iissue>=[]
  public toDoIssues:Array<Iissue>=[]
  public inProgressIssues:Array<Iissue>=[]
  public doneIssues:Array<Iissue>=[]
  public users:Array<Iuser>=[]
  public todo:string="Todo"
  public progress:string="In Progress"
  public done:string="Done"
  public assignees:any=[]
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:any;

  constructor(private _userService:UserService){

  }


  updateIssues(user:any,type:any){
    if(type=='add'){
      this.assignees.push(user.id)
      
    }
    else{
      console.log(this.assignees.indexOf(user.id))
      this.assignees.splice(this.assignees.indexOf(user.id),1)
    }
    if(this.assignees.length==0){
      this.toDoIssues=this.issues.filter(ele=>ele.status=="TODO")
      this.inProgressIssues=this.issues.filter(ele=>ele.status=="DOING")
      this.doneIssues=this.issues.filter(ele=>ele.status=="DONE")
    }
    else{
      let filteredTodoIssues=this.issues.filter(ele=>this.assignees.includes(+ele.assignee) && ele.status=="TODO")
    let filteredInProgressIssues=this.issues.filter(ele=>this.assignees.includes(+ele.assignee) && ele.status=="DOING")
    let filteredDoneIssues=this.issues.filter(ele=>this.assignees.includes(+ele.assignee) && ele.status=="DONE")
    this.toDoIssues=filteredTodoIssues
    this.inProgressIssues=filteredInProgressIssues
    this.doneIssues=filteredDoneIssues
    }
   
    // this.assignees.push(user.id)
      
    

  }
 



  ngOnInit(): void {
    this.isFetching=true
    this._userService.getUserIssues().subscribe(data=>{
      this.issues=data
      // console.log(data)
      this.toDoIssues=data.filter(ele=>ele.status=="TODO")
      this.inProgressIssues=data.filter(ele=>ele.status=="DOING")
      this.doneIssues=data.filter(ele=>ele.status=="DONE")
    })
    this._userService.getUsers().subscribe(data=>{this.users=data;this.dropdownList=data},()=>{},()=>{this.isFetching=false})
    

    
    this.dropdownSettings= {
      singleSelection: false,
      idField: 'id',
      textField: 'first_name',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    this.updateIssues(item,'add')
   

  }
  onSelectAll(items: any) {
    this.toDoIssues=this.issues.filter(ele=>ele.status=="TODO")
      this.inProgressIssues=this.issues.filter(ele=>ele.status=="DOING")
      this.doneIssues=this.issues.filter(ele=>ele.status=="DONE")
  }
  
  onItemDeSelect(item:any){
    // console.log(item)
    this.updateIssues(item,'remove')
  }
    
      
  }


