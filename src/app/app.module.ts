import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IssuesComponent } from './pages/issues/issues.component';
// import { CreateIssueComponent } from './pages/create-issue/create-issue.component';
import { IssueDetailComponent } from './pages/issue-detail/issue-detail.component';
import { ChartComponent } from './shared/chart/chart.component';
import { IssueListComponent } from './shared/issue-list/issue-list.component';
import { IssueCardComponent } from './shared/issue-card/issue-card.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './shared/create/create.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { routingComponents } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    IssueListComponent,
    IssueCardComponent,
    NavbarComponent,
    SidebarComponent,
    CreateComponent,
    NotfoundComponent,
    routingComponents

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
