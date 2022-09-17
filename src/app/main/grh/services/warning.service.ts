import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { RhWarning } from "../models/rh-warning.model";

const baseUrl = environment.UrlGrh;

@Injectable({
  providedIn: "root",
})
export class WarningService {
  constructor(private httpClient: HttpClient) {}

  createRhWarning(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/rhwarning`, data);
  }

  getRhWarning(id: number): Observable<RhWarning> {
    return this.httpClient.get<RhWarning>(`${baseUrl}/rhwarning/${id}`);
  }

  updateRhWarning(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/rhwarning/${id}`, data);
  }

  deleteRhWarning(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/rhwarning/${id}`, {
      responseType: "text",
    });
  }

  getRhWarnings(params: any): Observable<any> {
    return this.httpClient.get<RhWarning[]>(`${baseUrl}/rhwarning`, { params });
  }

  getRhWarningsByEmployeeId(id: number): Observable<any> {
    return this.httpClient.get<RhWarning[]>(
      `${baseUrl}/rhwarning/getByEmployeeId/${id}`
    );
  }

  getByEmployeeFirtNameOrLastName(name: String): Observable<any> {
    return this.httpClient.get<RhWarning[]>(
      `${baseUrl}/rhwarning/getByEmployeeFirtNameOrLastName/${name}`
    );
  }
}
