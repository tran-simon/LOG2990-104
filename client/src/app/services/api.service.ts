import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { SafeResourceUrl } from '@angular/platform-browser';
import { Drawing } from '../models/drawing';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private static API_BASE_URL: string;
  private static API_DATABASE_ROUTE: string;
  private static API_DRAWINGS_ROUTE: string;
  private static API_DRAWING_ROUTE: string;
  private static API_EMAIL_ROUTE: string;

  constructor(private http: HttpClient) {
    APIService.API_BASE_URL = 'http://localhost:3000/api';
    APIService.API_EMAIL_ROUTE = '/email';
    APIService.API_DATABASE_ROUTE = '/database';
    APIService.API_DRAWINGS_ROUTE = '/drawings';
    APIService.API_DRAWING_ROUTE = '/drawing';
  }

  async uploadDrawing(drawing: Drawing): Promise<void> {
    return new Promise<void>((resolve) => {
      const url = APIService.API_BASE_URL + APIService.API_DATABASE_ROUTE + APIService.API_DRAWINGS_ROUTE;

      const reqHeaders = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
      this.http.post(url, drawing, { responseType: 'text', headers: reqHeaders }).subscribe(() => {
        resolve();
      });
    });
  }

  async getAllDrawings(): Promise<Drawing[]> {
    return new Promise<Drawing[]>((resolve) => {
      const url = APIService.API_BASE_URL + APIService.API_DATABASE_ROUTE + APIService.API_DRAWINGS_ROUTE;

      this.http.get<Drawing[]>(url).subscribe((drawings: Drawing[]) => {
        resolve(drawings);
      });
    });
  }

  async getDrawingById(id: string): Promise<Drawing> {
    return new Promise<Drawing>((resolve) => {
      const url = APIService.API_BASE_URL + APIService.API_DATABASE_ROUTE + APIService.API_DRAWINGS_ROUTE + '/' + id;
      this.http.get<Drawing>(url).subscribe((drawing: Drawing) => {
        resolve(drawing);
      });
    });
  }

  async searchDrawings(name: string, tags: string): Promise<Drawing[]> {
    return new Promise<Drawing[]>((resolve) => {
      let url = APIService.API_BASE_URL + APIService.API_DATABASE_ROUTE + APIService.API_DRAWING_ROUTE + '?name=' + name;

      tags.split(',').forEach((tag) => {
        url += '&tag=' + tag;
      });

      this.http.get<Drawing[]>(url).subscribe((drawings: Drawing[]) => {
        resolve(drawings);
      });
    });
  }

  async deleteDrawing(id: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const url = APIService.API_BASE_URL + APIService.API_DATABASE_ROUTE + APIService.API_DRAWINGS_ROUTE + '/' + id;
      this.http.delete(url, { responseType: 'text' }).subscribe(() => {
        resolve();
      });
    });
  }
  async sendEmail(userName: string, userEmail: string, dataUrl: string, fileName: string, extension: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const url = APIService.API_BASE_URL + APIService.API_EMAIL_ROUTE + APIService.API_DRAWING_ROUTE;
      const imageURL = dataUrl.split(',')[1];
      console.log(imageURL);
      const user = {
        name: userName,
        email: userEmail,
        dataURL: imageURL,
        file: fileName,
        ext: extension,
      };
      const reqHeaders = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
      this.http.post(url, user, { responseType: 'text', headers: reqHeaders }).subscribe(() => {
        resolve();
      });
    });
  }
}
