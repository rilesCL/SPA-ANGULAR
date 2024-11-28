import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { tap } from 'rxjs';
import { environment } from '../../environments/environments';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private userNameSubject = new BehaviorSubject<string | null>(null);
  

  constructor(private http: HttpClient) {
    this.checkExistingToken();
  }
  checkExistingToken() {
   // Si un token existe dans le localStorage, on vérifie sa validité
   const token = localStorage.getItem('token');
   if (token) {
       this.verifyToken();
   }

  }

  login(username: string, password: string): Observable<any> {
    // Faire l'appel à l'API /session
    return this.http.post(`${this.apiUrl}/session`, { username, password })
      .pipe(
        tap((token: any) => {
          // Sauvegarder le token reçu
          localStorage.setItem('token', token);
          // Vérifier immédiatement le token et obtenir les infos utilisateur
          this.verifyToken();
        }),
        catchError((error) => {
            this.handleError(error);
            throw error;
        })
    );
}

  private verifyToken() {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Créer les headers avec le token
    const headers = { 'Authorization': token };

    // Appeler l'API /secret pour vérifier le token
    this.http.get(`${this.apiUrl}/secret`, { headers })
      .subscribe({
        next: (response: any) => {
          if (response.data?.valid) {
            // Si valide, sauvegarder le nom d'utilisateur
            this.userNameSubject.next(response.data.owner);
          }else {
            // Si invalide, nettoyer la session
            this.clearSession();
          }
        },
        error: (error) => {
          // Si erreur, nettoyer la session
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