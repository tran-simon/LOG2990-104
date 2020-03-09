import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Drawing } from '../models/drawing';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private static API_BASE_URL: string;
  private static API_DATABASE_ROUTE: string;
  private static API_DRAWINGS_ROUTE: string;

  constructor(private http: HttpClient) {
    APIService.API_BASE_URL = 'http://localhost:3000/api';
    APIService.API_DATABASE_ROUTE = '/database';
    APIService.API_DRAWINGS_ROUTE = '/drawings';
  }

  uploadDrawing(drawing: Drawing): void {
    const url = APIService.API_BASE_URL + APIService.API_DATABASE_ROUTE + APIService.API_DRAWINGS_ROUTE;

    const reqHeaders = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.post(url, JSON.stringify(drawing), { responseType: 'text', headers: reqHeaders }).subscribe();
  }
}
