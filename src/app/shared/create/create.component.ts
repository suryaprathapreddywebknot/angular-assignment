import { Component, OnInit } from '@angular/core';
import { Iissue } from 'src/app/core/interfaces/interfaces';
import { issueData } from 'src/app/core/interfaces/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() public issueDetailData:any;
 
  public priorityList=["HIGH","LOW","VERY LOW"]
  public statusList=["TODO","DOING","DONE"]
  public issueData=new issueData(null,null,null,null,null,null,null,null,null,null,null,null,null)
  public formType='create'
  public users:Array<Iuser>=[]

  constructor(private _userService:UserService,private _route:Router){

  }

  ngOnInit(): void {
    // console.log(this.issueDetailData)
    this._userService.getUsers().subscribe(data=>this.users=data)
    if(this.issueDetailData){
      this.issueData=this.issueDetailData
      this.formType='edit'
    }
   
    // console.log(this.issueData)
  }

  onSubmit(){
    if(this.formType=='create'){
      this.issueData.created_at=Date.now().toLocaleString()
      this.issueData.updated_at=Date.now().toLocaleString()
      this.issueData.short_id=`PCG-${this.issueData.created_by}-3767202`
      try {
        this._userService.createIssue(this.issueData).subscribe(data=>{console.log(data)})
      } catch (error) {
        alert('Unable to create Issue')
      }
      

    }
    if(this.formType=='edit'){
      this.issueData.updated_at=Date.now().toLocaleString()
      try {
        this._userService.updateIssue(this.issueData,this.issueData.id).subscribe(data=>console.log(data))
      } catch (error) {
        alert('Unable to edit issue')
      }
      
    }
   this._route.navigate(['/dashboard'])
  }

}
