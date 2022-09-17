import { HttpClient, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { RequestHoliday } from "../models/request-holiday.model";

const baseUrl = environment.UrlGrh;

@Injectable({
  providedIn: "root",
})
export class RequestHolidayService {
  constructor(private httpClient: HttpClient) {}

  createRequestHoliday(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/requestholiday`, data);
  }

  getRequestHoliday(id: number): Observable<RequestHoliday> {
    return this.httpClient.get<RequestHoliday>(
      `${baseUrl}/requestholiday/${id}`
    );
  }

  updateRequestHoliday(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/requestholiday/${id}`, data);
  }

  deleteRequestHoliday(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/requestholiday/${id}`, {
      responseType: "text",
    });
  }

  getHolidayRequestsByDate(date: Date): Observable<any> {
    return this.httpClient.get<RequestHoliday[]>(
      `${baseUrl}/requestholiday/getByDate/${date}`
    );
  }

  getHolidayRequests(params: any): Observable<any> {
    return this.httpClient.get<RequestHoliday[]>(`${baseUrl}/requestholiday`, {
      params,
    });
  }

  getPendingHolidayRequests(params: any): Observable<any> {
    return this.httpClient.get<RequestHoliday[]>(
      `${baseUrl}/requestholiday/getPendingWithPagination`,
      {
        params,
      }
    );
  }

  getAcceptedHolidayRequests(params: any): Observable<any> {
    return this.httpClient.get<RequestHoliday[]>(
      `${baseUrl}/requestholiday/getAcceptedWithPagination`,
      {
        params,
      }
    );
  }

  getRefusedHolidayRequests(params: any): Observable<any> {
    return this.httpClient.get<RequestHoliday[]>(
      `${baseUrl}/requestholiday/getRefusedWithPagination`,
      {
        params,
      }
    );
  }

  getPendingHolidayRequestsOfAnEmployee(
    params: any,
    id: number
  ): Observable<any> {
    return this.httpClient.get<RequestHoliday[]>(
      `${baseUrl}/requestholiday/getPendingOfAnEmployeeWithPagination/${id}`,
      {
        params,
      }
    );
  }

  getAcceptedHolidayRequestsOfAnEmployee(
    params: any,
    id: number
  ): Observable<any> {
    return this.httpClient.get<RequestHoliday[]>(
      `${baseUrl}/requestholiday/getAcceptedOfAnEmployeeWithPagination/${id}`,
      {
        params,
      }
    );
  }

  getRefusedHolidayRequestsOfAnEmployee(
    params: any,
    id: number
  ): Observable<any> {
    return this.httpClient.get<RequestHoliday[]>(
      `${baseUrl}/requestholiday/getRefusedOfAnEmployeeWithPagination/${id}`,
      {
        params,
      }
    );
  }

  // getPendingHolidayRequests(): Observable<any> {
  //   return this.httpClient.get<RequestHoliday[]>(
  //     `${baseUrl}/requestholiday/getPending`
  //   );
  // }

  // getAcceptedHolidayRequests(): Observable<any> {
  //   return this.httpClient.get<RequestHoliday[]>(
  //     `${baseUrl}/requestholiday/getAccepted`
  //   );
  // }

  // getRefusedHolidayRequests(): Observable<any> {
  //   return this.httpClient.get<RequestHoliday[]>(
  //     `${baseUrl}/requestholiday/getRefused`
  //   );
  // }

  // getPendingHolidayRequestsOfAnEmployee(id: number): Observable<any> {
  //   return this.httpClient.get<RequestHoliday[]>(
  //     `${baseUrl}/requestholiday/getPendingOfAnEmployee${id}`
  //   );
  // }

  // getAcceptedHolidayRequestsOfAnEmployee(id: number): Observable<any> {
  //   return this.httpClient.get<RequestHoliday[]>(
  //     `${baseUrl}/requestholiday/getAcceptedOfAnEmployee${id}`
  //   );
  // }

  // getRefusedHolidayRequestsOfAnEmployee(id: number): Observable<any> {
  //   return this.httpClient.get<RequestHoliday[]>(
  //     `${baseUrl}/requestholiday/getRefusedOfAnEmployee${id}`
  //   );
  // }
}
