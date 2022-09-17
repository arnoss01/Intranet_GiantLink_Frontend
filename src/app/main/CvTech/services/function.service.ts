import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Function } from "../models/function.model";

const baseUrl = environment.UrlCvTech;

@Injectable({
  providedIn: "root",
})
export class FunctionService {
  constructor(private http: HttpClient) {}

  getFunctions(): Observable<Function[]> {
    return this.http.get<Function[]>(`${baseUrl}/function`);
  }

  getFunction(id: number): Observable<Function> {
    return this.http.get<Function>(`${baseUrl}/function/${id}`);
  }

  addFunction(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/function`, data);
  }

  deleteFunction(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/function/${id}`, {
      responseType: "text",
    });
  }

  updateFunction(id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/function/${id}`, data);
  }

  getAllPagination(params: any): Observable<any> {
    return this.http.get<Function[]>(`${baseUrl}/function`, { params });
  }
}
