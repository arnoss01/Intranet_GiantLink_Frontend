import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commercial } from '../models/commercial.model';

const baseUrl = environment.UrlVente;

@Injectable({
  providedIn: 'root'
})
export class CommercialService {

  constructor(private httpClient: HttpClient) { }

  createCommercial(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/commercial`, data);
  }

  getCommercial(id: number): Observable<Commercial> {
    return this.httpClient.get<Commercial>(`${baseUrl}/commercial/${id}`);
  }

  updateCommercial(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/commercial/${id}`, data);
  }

  deleteCommercial(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/commercial/${id}`, { responseType: 'text' });
  }

  getCommercials(params: any): Observable<any> {
    return this.httpClient.get<Commercial[]>(`${baseUrl}/commercial`, { params });
  }

}
