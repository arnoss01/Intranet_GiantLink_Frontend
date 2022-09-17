import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { Education } from '../models/education.model';
import { Skill } from '../models/skill.model';
import { GlobalExperience } from '../models/global-experience.model';
import { Domain } from 'domain';
import { Campaign } from '../models/campaign.model';

const baseUrl = environment.UrlCvTech;

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private httpClient: HttpClient) { }

  createCv(data: any): Observable<any>{
    return this.httpClient.post(`${baseUrl}`,data);
  }

  getCandidates(params:any):Observable<any>{
    return this.httpClient.get<Candidate[]>(`${baseUrl}/candidate`,{ params });
  }

  getEducations(params:any):Observable<any>{
    return this.httpClient.get<Education[]>(`${baseUrl}/education`,{ params });
  }

  getLanguages(params:any):Observable<any>{
    return this.httpClient.get<Language[]>(`${baseUrl}/language`,{ params });
  }

  getSkills(params:any):Observable<any>{
    return this.httpClient.get<Skill[]>(`${baseUrl}/skills`,{ params });
  }

  getGlobalExperience(params:any):Observable<any>{
    return this.httpClient.get<GlobalExperience[]>(`${baseUrl}/experience`,{ params });
  }

  getDomains(params:any):Observable<any>{
    return this.httpClient.get<Domain[]>(`${baseUrl}/domain`,{ params });
  }
  
  getCampaigns(params:any):Observable<any>{
    return this.httpClient.get<Campaign[]>(`${baseUrl}/campaign`,{ params });
  }
}
