import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

import { Region } from "../models/region.model";

const baseUrl = environment.UrlCvTech;

@Injectable({
  providedIn: "root",
})
export class RegionService {
  constructor(private http: HttpClient) {}

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`${baseUrl}/region/all`);
  }

  getRegion(id: number): Observable<Region> {
    return this.http.get<Region>(`${baseUrl}/region/${id}`);
  }

  addRegion(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/region`, data);
  }

  deleteRegion(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/region/${id}`, {
      responseType: "text",
    });
  }

  updateRegion(id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/region/${id}`, data);
  }

  getAllPagination(params: any): Observable<any> {
    return this.http.get<Function[]>(`${baseUrl}/region`, { params });
  }
}
