import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { RequestDeparture } from "../models/request-departure.model";

const baseUrl = environment.UrlGrh;

@Injectable({
  providedIn: "root",
})
export class RequestDepartureService {
  constructor(private httpClient: HttpClient) {}

  createRequestDeparture(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/requestdeparture`, data);
  }

  getRequestDeparture(id: number): Observable<RequestDeparture> {
    return this.httpClient.get<RequestDeparture>(
      `${baseUrl}/requestdeparture/${id}`
    );
  }

  updateRequestDeparture(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/requestdeparture/${id}`, data);
  }

  deleteRequestDeparture(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/requestdeparture/${id}`, {
      responseType: "text",
    });
  }

  getDepartureRequestsByDate(date: Date): Observable<any> {
    return this.httpClient.get<RequestDeparture[]>(
      `${baseUrl}/requestdeparture/getByDate/${date}`
    );
  }

  getDepartureRequests(params: any): Observable<any> {
    return this.httpClient.get<RequestDeparture[]>(
      `${baseUrl}/requestdeparture`,
      {
        params,
      }
    );
  }

  getPendingDepartureRequests(params: any): Observable<any> {
    return this.httpClient.get<RequestDeparture[]>(
      `${baseUrl}/requestdeparture/getPendingWithPagination`,
      {
        params,
      }
    );
  }

  getAcceptedDepartureRequests(params: any): Observable<any> {
    return this.httpClient.get<RequestDeparture[]>(
      `${baseUrl}/requestdeparture/getAcceptedWithPagination`,
      {
        params,
      }
    );
  }

  getRefusedDepartureRequests(params: any): Observable<any> {
    return this.httpClient.get<RequestDeparture[]>(
      `${baseUrl}/requestdeparture/getRefusedWithPagination`,
      {
        params,
      }
    );
  }

  getPendingDepartureRequestsOfAnEmployee(
    params: any,
    id: number
  ): Observable<any> {
    return this.httpClient.get<RequestDeparture[]>(
      `${baseUrl}/requestdeparture/getPendingOfAnEmployeeWithPagination/${id}`,
      {
        params,
      }
    );
  }

  getAcceptedDepartureRequestsOfAnEmployee(
    params: any,
    id: number
  ): Observable<any> {
    return this.httpClient.get<RequestDeparture[]>(
      `${baseUrl}/requestdeparture/getAcceptedOfAnEmployeeWithPagination/${id}`,
      {
        params,
      }
    );
  }

  getRefusedDepartureRequestsOfAnEmployee(
    params: any,
    id: number
  ): Observable<any> {
    return this.httpClient.get<RequestDeparture[]>(
      `${baseUrl}/requestdeparture/getRefusedOfAnEmployeeWithPagination/${id}`,
      {
        params,
      }
    );
  }

  // getPendingDepartureRequests(): Observable<any> {
  //   return this.httpClient.get<RequestDeparture[]>(
  //     `${baseUrl}/requestdeparture/getPending`
  //   );
  // }

  // getAcceptedDepartureRequests(): Observable<any> {
  //   return this.httpClient.get<RequestDeparture[]>(
  //     `${baseUrl}/requestdeparture/getAccepted`
  //   );
  // }

  // getRefusedDepartureRequests(): Observable<any> {
  //   return this.httpClient.get<RequestDeparture[]>(
  //     `${baseUrl}/requestdeparture/getRefused`
  //   );
  // }

  // getPendingDepartureRequestsOfAnEmployee(id: number): Observable<any> {
  //   return this.httpClient.get<RequestDeparture[]>(
  //     `${baseUrl}/requestdeparture/getPendingOfAnEmployee${id}`
  //   );
  // }

  // getAcceptedDepartureRequestsOfAnEmployee(id: number): Observable<any> {
  //   return this.httpClient.get<RequestDeparture[]>(
  //     `${baseUrl}/requestdeparture/getAcceptedOfAnEmployee${id}`
  //   );
  // }

  // getRefusedDepartureRequestsOfAnEmployee(id: number): Observable<any> {
  //   return this.httpClient.get<RequestDeparture[]>(
  //     `${baseUrl}/requestdeparture/getRefusedOfAnEmployee${id}`
  //   );
  // }
}
