import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { IssuesComponent } from './pages/issues/issues.component';
import { IssueDetailComponent } from './pages/issue-detail/issue-detail.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

const routes: Routes = [
  {path:"dashboard",component:DashboardComponent},
  {path:"issues",component:IssuesComponent},
  {path:`issues/:id`,component:IssueDetailComponent},
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:"**",component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[DashboardComponent,IssuesComponent,IssueDetailComponent,NotfoundComponent]
