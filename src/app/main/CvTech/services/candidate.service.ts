import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate.model';

const baseUrl = environment.UrlCvTech;


@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${baseUrl}/candidat`);
  }

  getbyid(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${baseUrl}/candidat/${id}`);

  }

  getAllPagination(params: any): Observable<any> {
    return this.http.get<Candidate[]>(`${baseUrl}/candidat`, { params });
  }

  addCandidat(candidat: Candidate): Observable<any> {
    return this.http.post(`${baseUrl}/candidat/`, candidat);
  }

  update(data: any, candidat_id: number): Observable<HttpEvent<any>> {
    return this.http.put<HttpEvent<any>>(`${baseUrl}/candidat/${candidat_id}`, data);
  }


  DeleteCandidatById(id: number): Observable<HttpEvent<any>> {
    return this.http.delete<HttpEvent<any>>(`${baseUrl}/candidat/${id}`);
  }
}
