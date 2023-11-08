import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../emp.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public apiUrl = "http://localhost:8000"
  constructor(
    private http: HttpClient
  ) { }

  getUserdetail(id: any):Observable<Employee>  {

    return this.http.get<Employee>(`${this.apiUrl}/employee/employee-detail/${id}/`);
  }

  updateUserdetail(id: any, data:any){
    return this.http.patch(`${this.apiUrl}/employee/employee-profile-update/${id}/`, data);
  }

  getTechnologyList(){
    return this.http.get(`${this.apiUrl}/basics/tech_list`);
  }

  getExpList(){
    return this.http.get(`${this.apiUrl}/basics/exp_list`);
  }
}
