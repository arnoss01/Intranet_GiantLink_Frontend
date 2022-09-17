import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { RequestMaterial } from "../models/request-material.model";

const baseUrl = environment.UrlGrh;

@Injectable({
  providedIn: "root",
})
export class RequestMaterialService {
  constructor(private httpClient: HttpClient) {}

  createRequestMaterial(data: any): Observable<any> {
    return this.httpClient.post(`${baseUrl}/requestmaterial`, data);
  }

  getRequestMaterial(id: number): Observable<RequestMaterial> {
    return this.httpClient.get<RequestMaterial>(
      `${baseUrl}/requestmaterial/${id}`
    );
  }

  updateRequestMaterial(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/requestmaterial/${id}`, data);
  }

  deleteRequestMaterial(id: number): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/requestmaterial/${id}`, {
      responseType: "text",
    });
  }

  getMaterialRequestsByDate(date: Date): Observable<any> {
    return this.httpClient.get<RequestMaterial[]>(
      `${baseUrl}/requestmaterial/getByDate/${date}`
    );
  }

  getMaterialRequests(params: any): Observable<any> {
    return this.httpClient.get<RequestMaterial[]>(
      `${baseUrl}/requestmaterial`,
      {
        params,
      }
    );
  }

  getPendingMaterialRequests(params: any): Observable<any> {
    return this.httpClient.get<RequestMaterial[]>(
      `${baseUrl}/requestmaterial/getPendingWithPagination`,
      {
        params,
      }
    );
  }

  getAcceptedMaterialRequests(params: any): Observable<any> {
    return this.httpClient.get<RequestMaterial[]>(
      `${baseUrl}/requestmaterial/getAcceptedWithPagination`,
      {
        params,
      }
    );
  }

  getRefusedMaterialRequests(params: any): Observable<any> {
    return this.httpClient.get<RequestMaterial[]>(
      `${baseUrl}/requestmaterial/getRefusedWithPagination`,
      {
        params,
      }
    );
  }

  getPendingMaterialRequestsOfAnEmployee(
    params: any,
    id: number
  ): Observable<any> {
    return this.httpClient.get<RequestMaterial[]>(
      `${baseUrl}/requestmaterial/getPendingOfAnEmployeeWithPagination/${id}`,
      {
        params,
      }
    );
  }

  getAcceptedMaterialRequestsOfAnEmployee(
    params: any,
    id: number
  ): Observable<any> {
    return this.httpClient.get<RequestMaterial[]>(
      `${baseUrl}/requestmaterial/getAcceptedOfAnEmployeeWithPagination/${id}`,
      {
        params,
      }
    );
  }

  getRefusedMaterialRequestsOfAnEmployee(
    params: any,
    id: number
  ): Observable<any> {
    return this.httpClient.get<RequestMaterial[]>(
      `${baseUrl}/requestmaterial/getRefusedOfAnEmployeeWithPagination/${id}`,
      {
        params,
      }
    );
  }

  // getPendingMaterialRequests(): Observable<any> {
  //   return this.httpClient.get<RequestMaterial[]>(
  //     `${baseUrl}/requestmaterial/getPending`
  //   );
  // }

  // getAcceptedMaterialRequests(): Observable<any> {
  //   return this.httpClient.get<RequestMaterial[]>(
  //     `${baseUrl}/requestmaterial/getAccepted`
  //   );
  // }

  // getRefusedMaterialRequests(): Observable<any> {
  //   return this.httpClient.get<RequestMaterial[]>(
  //     `${baseUrl}/requestmaterial/getRefused`
  //   );
  // }

  // getPendingMaterialRequestsOfAnEmployee(id: number): Observable<any> {
  //   return this.httpClient.get<RequestMaterial[]>(
  //     `${baseUrl}/requestmaterial/getPendingOfAnEmployee${id}`
  //   );
  // }

  // getAcceptedMaterialRequestsOfAnEmployee(id: number): Observable<any> {
  //   return this.httpClient.get<RequestMaterial[]>(
  //     `${baseUrl}/requestmaterial/getAcceptedOfAnEmployee${id}`
  //   );
  // }

  // getRefusedMaterialRequestsOfAnEmployee(id: number): Observable<any> {
  //   return this.httpClient.get<RequestMaterial[]>(
  //     `${baseUrl}/requestmaterial/getRefusedOfAnEmployee${id}`
  //   );
  // }
}
