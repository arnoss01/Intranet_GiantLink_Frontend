import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

const baseUrl = environment.UrlVente;

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

  changeStatus(id: number, status: boolean): Observable<any> {
    return this.httpClient.put(`${baseUrl}/project/status/${id}`, status );
  }

  deleteProject(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/project/${id}`, { responseType: 'text' });
  }

  getProjects(params: any): Observable<any> {
    return this.httpClient.get<Project[]>(`${baseUrl}/project`, { params });
  }

}
