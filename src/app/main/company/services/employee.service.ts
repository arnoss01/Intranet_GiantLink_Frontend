import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

const baseUrl = environment.UrlCompany;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }
  
 

  createEmployee(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/employee`, data);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${baseUrl}/employee/${id}`);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    console.log("update Employee Service : ");
    
    return this.httpClient.put(`${baseUrl}/employee/${id}`, data);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/employee/${id}`, { responseType: 'text' });
  }

  getEmployees(params: any): Observable<any> {
    return this.httpClient.get<Employee[]>(`${baseUrl}/employee`, { params });
  }
}
