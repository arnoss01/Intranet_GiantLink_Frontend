import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { GlobalExperience } from '../models/global-experience.model';

const baseUrl = environment.UrlCvTech;

@Injectable({
  providedIn: 'root'
})



export class GlobalExperienceService implements OnInit {

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getExperiences()
  }

  getExperiences() : Observable<GlobalExperience[]>
  {
      return this.http.get<GlobalExperience[]>(`${baseUrl}/experience`)
  }

  getAllPagination(params: any): Observable<any> {
    return this.http.get<GlobalExperience[]>(`${baseUrl}/experience`, { params });
  }

  addExperience(experience : GlobalExperience)
  {
    return this.http.post(`${baseUrl}/experience`,experience)
  }

  deleteExperience(id : number) : Observable<any>
  {
    return this.http.delete(`${baseUrl}/experience/${id}`,{ responseType : 'text'})
  }
}


