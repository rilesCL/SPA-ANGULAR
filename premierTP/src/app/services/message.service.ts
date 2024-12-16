import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { environment } from '../../environments/environments';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = environment.apiUrl
  

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/commentaire`).pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }


  postMessage(message:string, rating:number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': token || '' };
  return this.http.post(`${this.apiUrl}/commentaire`, {message, rating},{ headers }).pipe(
    catchError((error) => {
      return this.errorHandler.handleError(error);
    })
  );
  }

  deleteMessage(id: string, headers:any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/commentaire/${id}`, { headers }).pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  getMessagesCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/nb-commentaires`).pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  getAutoRefresh(): Observable<any> {
    return interval(900000).pipe(
      startWith(0),
      switchMap(() => this.getMessagesCount())
    );
  }

}

