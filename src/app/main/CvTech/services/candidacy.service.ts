import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const baseUrl = environment.UrlCvTech;

@Injectable({
  providedIn: 'root'
})
export class CandidacyService {

  constructor(private http: HttpClient) { }

  getAllcandidacy(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/candidacy/all`);
  }

  getbyid(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/candidacy/${id}`);
  }

  getAllPagination(params: any): Observable<any> {
    return this.http.get<any[]>(`${baseUrl}/candidacy`, { params });
  }

  DeletecandidacyById(id: number): Observable<HttpEvent<any>> {
    return this.http.delete<HttpEvent<any>>(`${baseUrl}/candidacy/${id}`);
  }

  addcandidacy(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/candidacy`, data);
  }

}
