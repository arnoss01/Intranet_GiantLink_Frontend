import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

const baseUrl = environment.UrlLearning;

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  constructor(private http: HttpClient) { }

  getByTrainingId(id: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${baseUrl}/course/training/${id}`);
  }

  add(course: Course): Observable<any> {
    return this.http.post(`${baseUrl}/course`, course)
  }


}
