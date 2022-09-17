import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

const baseUrl = environment.UrlCompany;

@Injectable({
  providedIn: 'root'
})
export class PosteService {

  constructor() { }
}
