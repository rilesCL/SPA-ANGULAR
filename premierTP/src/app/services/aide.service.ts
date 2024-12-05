import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AideService {
  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  getAide(langue: string = 'fr'): Observable<any> {
    return this.http.get(`${this.apiUrl}/aide2024/${langue}`);
  }
}
