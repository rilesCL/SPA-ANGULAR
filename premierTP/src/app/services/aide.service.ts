import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { Aide } from '../interfaces/aideg';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AideService {
  private apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  
  ) { }

  getAide(langue: string = 'fr'): Observable<Aide> {
    // Forcer la langue à 'fr' peu importe ce qui est passé
    const url = `${this.apiUrl}/aide2024/fr`;
    
    console.log('URL appelée:', url);

    return this.http.get<Aide>(url).pipe(
      tap(response => console.log('Réponse:', response)),
      catchError(error => {
        return this.errorHandler.handleError(error);
      })
    );
  }
}