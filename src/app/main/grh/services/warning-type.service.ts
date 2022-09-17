import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { RhWarningType } from "../models/rh-warning-type.model";

const baseUrl = environment.UrlGrh;

@Injectable({
  providedIn: "root",
})
export class WarningTypeService {
  constructor(private httpClient: HttpClient) {}

  createRhWarningType(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/rhwarningtype`, data);
  }

  getRhWarningType(id: number): Observable<RhWarningType> {
    return this.httpClient.get<RhWarningType>(`${baseUrl}/rhwarningtype/${id}`);
  }

  updateRhWarningType(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/rhwarningtype/${id}`, data);
  }

  deleteRhWarningType(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/rhwarningtype/${id}`, {
      responseType: "text",
    });
  }

  getRhWarningTypes(params: any): Observable<any> {
    return this.httpClient.get<RhWarningType[]>(`${baseUrl}/rhwarningtype`, {
      params,
    });
  }
}
