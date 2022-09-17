import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Contrat } from "../models/Contrat.model";

const baseUrl = environment.UrlCvTech;

@Injectable({
  providedIn: "root",
})
export class ContratService {
  constructor(private http: HttpClient) {}


  getContracts(params: any): Observable<any> {
    return this.http.get<Contrat[]>(`${baseUrl}/contract`, { params });
  }

  getContrat(id: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${baseUrl}/contract/${id}`);
  }

  createContrat(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/contract`, data);
  }

  deleteContrat(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/contract/${id}`, {
      responseType: "text",
    });
  }

  updateContract(id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/contract/${id}`, data);
  }

  getAllPagination(params: any): Observable<any> {
    return this.http.get<Contrat[]>(`${baseUrl}/contract`, { params });
  }
}
