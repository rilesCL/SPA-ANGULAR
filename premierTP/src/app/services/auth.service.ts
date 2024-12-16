import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { tap } from 'rxjs';
import { environment } from '../../environments/environments';
import { response } from 'express';
import { ErrorHandlerService } from './error-handler.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;
  private userNameSubject = new BehaviorSubject<string | null>(null);
  

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
    
  ) {
    console.log('AuthService créé !');
    this.checkExistingToken();

  }
  checkExistingToken() { 
    if (typeof localStorage !== 'undefined') {
   // Si un token existe dans le localStorage, on vérifie sa validité
   const token = localStorage.getItem('token');
   if (token) {
       this.verifyToken();
   }
  }

  }

  login(username: string, password: string): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/session`, { username, password })
      .pipe(
        tap((token: any) => {
          // Sauvegarder le token reçu
          console.log('Token reçu:', token);
          localStorage.setItem('token', token);
          // Vérifier immédiatement le token et obtenir les infos utilisateur
          this.verifyToken();
        }),
        catchError((error) => {
          return this.errorHandler.handleError(error);
        })
      );
    }
logout(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = { 'Authorization': token || '' };

  return this.http.delete(`${this.apiUrl}/session`, { headers })
      .pipe(
          tap(() => {
              this.clearSession();
          }),
          catchError((error) => {
            return this.errorHandler.handleError(error);
          })
        );
      }

  private verifyToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Étape 1: Pas de token dans le localStorage');
      return;
  }

    // Créer les headers avec le token
    const headers = { 'Authorization': token };
    console.log('Étape 2: Envoi de la requête /secret avec le token:', token);

    // Appeler l'API /secret pour vérifier le token
    this.http.get(`${this.apiUrl}/secret`, { headers })
      .subscribe({
        next: (response: any) => {
          console.log('Étape 3: Réponse complète reçue:', response);
          console.log('Étape 3.1: Structure de response.data:', response.data);
          if (response.valid) {
            console.log('Token valide pour:', response.owner);
            this.userNameSubject.next(response.owner);
        } else {
            console.log('Token invalide');
            this.clearSession();
          }
    },
        error: (error) => {
          // Si erreur, nettoyer la session
          console.log('Token invalide, mais pas de nettoyage de la session');
          this.handleError(error);
        }
      });
  }

  private clearSession() {
    localStorage.removeItem('token');
    this.userNameSubject.next(null);
  }

  private handleError(error: any) {
    console.error('Une erreur est survenue', error);
    this.clearSession();
}

isLoggedIn(): boolean {
return !!localStorage.getItem('token');
}

getCurrentUser(): Observable<string | null> {
  return this.userNameSubject.asObservable();
}

}