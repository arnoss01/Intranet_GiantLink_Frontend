import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Forum} from "../models/forum.model";
const baseUrl = environment.UrlWorkspace;

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private httpClient: HttpClient) {}

  addForum(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/forum`, data);
  }

  getForum(id: number): Observable<Forum> {
    return this.httpClient.get<Forum>(`${baseUrl}/forum/${id}`);
  }

  updateForum(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/forum/${id}`, data);
  }

  deleteForum(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/forum/${id}`, {
      responseType: "text",
    });
  }

  getForums(params: any): Observable<any> {
    return this.httpClient.get<Forum[]>(`${baseUrl}/forum`, { params });
  }
}
