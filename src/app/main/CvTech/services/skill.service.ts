import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Skill } from "../models/skill.model";

const baseUrl = environment.UrlCvTech;

@Injectable({
  providedIn: "root",
})
export class SkillService {
  constructor(private http: HttpClient) {}

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${baseUrl}/skills`);
  }

  getSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${baseUrl}/skills/${id}`);
  }

  addSkill(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/skills`, data);
  }

  deleteSkill(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/skills/${id}`, {
      responseType: "text",
    });
  }

  updateSkill(id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/skills/${id}`, data);
  }

  getAllPagination(params: any): Observable<any> {
    return this.http.get<Skill[]>(`${baseUrl}/skills`, { params });
  }
}
