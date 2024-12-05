import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { environment } from '../../environments/environments';
import { startWith, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/commentaire`);
}

  postMessage(message:string, rating:number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': token || '' };
  return this.http.post(`${this.apiUrl}/commentaire`, {message, rating},{ headers });
  }

  deleteMessage(id: string, headers:any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/commentaire/${id}`, { headers });
  }

  getMessagesCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/nb-commentaires`);
  }

  getAutoRefresh(): Observable<any> {
    return interval(900000).pipe(
      startWith(0),
      switchMap(() => this.getMessagesCount())
    );
  }

}

