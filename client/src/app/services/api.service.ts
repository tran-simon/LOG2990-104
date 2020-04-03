import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Drawing } from '../models/drawing';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private static API_BASE_URL: string;
  private static API_DATABASE_ROUTE: string;
  private static API_DRAWINGS_ROUTE: string;
  private static API_DRAWINGS_QUERY_ROUTE: string;

  constructor(private http: HttpClient) {
    APIService.API_BASE_URL = 'http://localhost:3000/api';
    APIService.API_DATABASE_ROUTE = '/database';
    APIService.API_DRAWINGS_ROUTE = '/drawings';
    APIService.API_DRAWINGS_QUERY_ROUTE = '/drawing';
  }

  uploadDrawing(drawing: Drawing): void {
    const url = APIService.API_BASE_URL + APIService.API_DATABASE_ROUTE + APIService.API_DRAWINGS_ROUTE;

    const reqHeaders = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    this.http.post(url, JSON.stringify(drawing), { responseType: 'text', headers: reqHeaders }).subscribe();
  }

  getAllDrawings(): Observable<Drawing[]> {
    const url = APIService.API_BASE_URL + APIService.API_DATABASE_ROUTE + APIService.API_DRAWINGS_ROUTE;

    return this.http.get<Drawing[]>(url);
  }

  searchDrawings(name: string, tags: string): Observable<Drawing[]> {
    let url = APIService.API_BASE_URL + APIService.API_DATABASE_ROUTE + APIService.API_DRAWINGS_QUERY_ROUTE + '?name=' + name;

    tags.split(',').forEach((tag) => {
      url += '&tag=' + tag;
    });

    return this.http.get<Drawing[]>(url);
  }

  deleteDrawing(id: string): void {
    const url = APIService.API_BASE_URL + APIService.API_DATABASE_ROUTE + APIService.API_DRAWINGS_ROUTE + '/' + id;
    this.http.delete(url, { responseType: 'text' }).subscribe();
  }
}
