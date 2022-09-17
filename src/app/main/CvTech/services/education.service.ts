import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Education } from '../models/education.model';

const baseUrl = environment.UrlCvTech;

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http : HttpClient) { }

  getEducations(): Observable<Education[]> 
  {
    return this.http.get<Education[]>(`${baseUrl}/education`);
  }

  getEducation(id: number): Observable<Education> 
  {
    return this.http.get<Education>(`${baseUrl}/education/${id}`);
  }

  addEducation(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/education`, data);
  }

  deleteEducation(id : number): Observable<any>
  {
    return this.http.delete(`${baseUrl}/education/${id}`,{responseType : 'text'});
  }

  getAllPagination(params: any): Observable<any> {
    return this.http.get<Education[]>(`${baseUrl}/education`, { params });
  }

  updateEducation(id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/education/${id}`, data);
  }
}
