import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { Material } from "../models/material.model";

const baseUrl = environment.UrlGrh;

@Injectable({
  providedIn: "root",
})
export class MaterialService {
  constructor(private httpClient: HttpClient) {}

  getMaterial(id: number): Observable<Material> {
    return this.httpClient.get<Material>(`${baseUrl}/employee/${id}`);
  }

  getMaterials(params: any): Observable<any> {
    return this.httpClient.get<Material[]>(`${baseUrl}/employee`, { params });
  }
}
