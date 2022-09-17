import { HttpClient, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Company } from "../models/company.model";
import { Observable } from "rxjs";
import { environment } from "environments/environment";

const baseUrl = environment.UrlCompany;

@Injectable({
  providedIn: "root",
})
export class CompanyService {
  constructor(private httpClient: HttpClient) {}

  createCompany(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/company`, data);
  }

  getCompany(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${baseUrl}/company/${id}`);
  }

  updateCompany(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/company/${id}`, data);
  }

  deleteCompany(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/company/${id}`, {
      responseType: "text",
    });
  }

  getCompanies(params: any): Observable<any> {
    return this.httpClient.get<Company[]>(`${baseUrl}/company`, { params });
  }

  deleteMultipleTeam(ids: any[]): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("ids", ids.join(", "));
    const req = new HttpRequest("DELETE", `${baseUrl}/company`, formData, {
      responseType: "text",
    });
    return this.httpClient.request(req);
  }
}
