import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HolidayBalance } from '../models/holiday-balance.model';

const baseUrl = environment.UrlGrh;

@Injectable({
  providedIn: 'root'
})
export class HolidayBalanceService {

  constructor(private httpClient: HttpClient) { }

  createBalance(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/holidayBalance`, data);
  }

  getBalance(id: number): Observable<HolidayBalance> {
    return this.httpClient.get<HolidayBalance>(`${baseUrl}/holidayBalance/${id}`);
  }

  getBalanceByEmployee(id: number): Observable<HolidayBalance> {
    return this.httpClient.get<HolidayBalance>(`${baseUrl}/holidayBalance/byemployee/${id}`);
  }

  updateBalance(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/holidayBalance/${id}`, data);
  }

  deleteBalance(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/holidayBalance/${id}`, { responseType: 'text' });
  }

  getBalances(params: any): Observable<any> {
    return this.httpClient.get<HolidayBalance[]>(`${baseUrl}/holidayBalance`, { params });
  }
}
