import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur inconnue s\'est produite.';

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client (ex: perte de connexion)
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      // Erreur côté serveur
      switch (error.status) {
        case 403:
          errorMessage = 'Vous n\'êtes pas autorisé à effectuer cette action.';
          break;
        case 500:
          errorMessage = 'Une erreur est survenue sur le serveur.';
          break;
        default:
          errorMessage = error.error.message || error.statusText;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
