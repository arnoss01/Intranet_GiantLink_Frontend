import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { id } from "@swimlane/ngx-datatable";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Visit } from "../models/visit.model";

const baseUrl = environment.UrlGrh;

@Injectable({
  providedIn: "root",
})
export class VisitService {
  constructor(private httpClient: HttpClient) {}

  createVisit(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/visit`, data);
  }

  getVisit(id: number): Observable<Visit> {
    return this.httpClient.get<Visit>(`${baseUrl}/visit/${id}`);
  }

  updateVisit(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/visit/${id}`, data);
  }

  deleteVisit(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/visit/${id}`, {
      responseType: "text",
    });
  }

  getVisits(params: any): Observable<any> {
    return this.httpClient.get<Visit[]>(`${baseUrl}/visit`, { params });
  }

  getVisitsByEmployeeId(id: number): Observable<any> {
    return this.httpClient.get<Visit[]>(
      `${baseUrl}/visit/getByEmployeeId/${id}`
    );
  }

  getByEmployeeFirtNameOrLastName(name: String): Observable<any> {
    return this.httpClient.get<Visit[]>(
      `${baseUrl}/visit/getByEmployeeFirtNameOrLastName/${name}`
    );
  }
}
