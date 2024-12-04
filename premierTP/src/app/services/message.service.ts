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
  return this.http.post(`${this.apiUrl}/commentaire`, {message, rating});
  }

  deleteMessage(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/commentaire/${id}`);
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

