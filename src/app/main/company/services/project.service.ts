import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from 'app/main/crm/models/project.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const baseUrl = environment.UrlCompany;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }

  createProject(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/project`, data);
  }

  getProject(id: number): Observable<Project> {
    return this.httpClient.get<Project>(`${baseUrl}/project/${id}`);
  }

  updateProject(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/project/${id}`, data);
  }

  deleteProject(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/project/${id}`, { responseType: 'text' });
  }

  getProjects(params: any): Observable<any> {
    return this.httpClient.get<Project[]>(`${baseUrl}/project`, { params });
  }

  deleteMultipleProject(ids:any[]): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('ids', ids.join(', '));
    const req = new HttpRequest('DELETE', `${baseUrl}/job`, formData, {
      responseType: 'text'
    });
    return this.httpClient.request(req);
  }
  
}
