import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Team } from '../models/team.model';

const baseUrl = environment.UrlCompany;

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private httpClient: HttpClient) { }

  createTeam(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/team`, data);
  }

  getTeam(id: number): Observable<Team> {
    return this.httpClient.get<Team>(`${baseUrl}/team/${id}`);
  }

  updateTeam(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/team/${id}`, data);
  }

  deleteTeam(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/team/${id}`, { responseType: 'text' });
  }

  getTeams(params: any): Observable<any> {
    return this.httpClient.get<Team[]>(`${baseUrl}/team`, { params });
  }

  deleteMultipleTeam(ids:any[]): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('ids', ids.join(', '));
    const req = new HttpRequest('DELETE', `${baseUrl}/team`, formData, {
      responseType: 'text'
    });
    return this.httpClient.request(req);
  }
  
}
