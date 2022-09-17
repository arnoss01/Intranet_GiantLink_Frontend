import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';

const baseUrl = environment.UrlCompany;

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(private httpClient: HttpClient) { }

  createJob(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/job`, data);
  }

  getJob(id: number): Observable<Job> {
    return this.httpClient.get<Job>(`${baseUrl}/job/${id}`);
  }

  updateJob(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/job/${id}`, data);
  }

  deleteJob(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/job/${id}`, { responseType: 'text' });
  }

  getJobs(params: any): Observable<any> {
    return this.httpClient.get<Job[]>(`${baseUrl}/job`, { params });
  }

  deleteMultipleJob(ids:any[]): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('ids', ids.join(', '));
    const req = new HttpRequest('DELETE', `${baseUrl}/job`, formData, {
      responseType: 'text'
    });
    return this.httpClient.request(req);
  }
  
}
