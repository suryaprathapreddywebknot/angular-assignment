import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iissue, Iuser } from '../interfaces/interfaces';
import { observable, Observable } from 'rxjs';
import { url } from '../constants/api';
import { endpoints } from '../constants/api';
import { map,filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  constructor( private _http:HttpClient) {
   }

   getUserIssues():Observable<Iissue[]>{

    return this._http.get<Iissue[]>(`${url+endpoints.issues}`)
   }

   getUser(id:any):Observable<Iuser>{
    return this._http.get<Iuser>(`${url+endpoints.users+id}`)

   }

   getUsers():Observable<Iuser[]>{
    return this._http.get<Iuser[]>(`${url+endpoints.users}`)
   }

   getIssueDetail(id:any){
    return  this._http.get<Iissue>(`${url+endpoints.issues+id}`)
   }

   createIssue(issue:any){
    return this._http.post(`${url+endpoints.issues}`,issue)

   }

   updateIssue(issue:any,id:any){
    return this._http.put(`${url+endpoints.issues+id}/`,issue)
   }

   deleteIssue(id:any){
    return this._http.delete(`${url+endpoints.issues+id}/`)
   }



}
