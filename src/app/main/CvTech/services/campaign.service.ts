
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const baseUrl = environment.UrlCvTech;

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  getAllCampaign(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/campaign/all`);
  }

  getbyid(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/campaign/${id}`);
  }

  getAllPagination(params: any): Observable<any> {
    return this.http.get<any[]>(`${baseUrl}/campaign`, { params });
  }
  deleteCampaign(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/campaign/${id}`, {
      responseType: "text",
    });
  }

  addCampaign(data: any): Observable<any> {
    console.log(data);
    console.log("Hhhhhhhhhhhh");
    return this.http.post(`${baseUrl}/campaign`, data);
  }


  

}
