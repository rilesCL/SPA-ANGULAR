import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private apiUrl = 'https://us-central1-ghilas-first.cloudfunctions.net/user-service';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token pour getProfile:', token);  // Log du token

    return this.http.get(this.apiUrl, {
      headers: new HttpHeaders({
        'Authorization': token || '',
        'X-Secret-Key': 'kS3i2gPq9vL5nM8x'
      })
    }).pipe(
      tap(response => console.log('Réponse getProfile:', response))  // Log de la réponse
    );
  }

  updateProfile(data: { nom: string; prenom: string }): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Envoi mise à jour:', data); // Pour déboguer
  
    return this.http.patch(this.apiUrl, data, {
      headers: new HttpHeaders({
        'Authorization': token || '',
        'X-Secret-Key': 'kS3i2gPq9vL5nM8x',
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(response => console.log('Réponse mise à jour:', response))
    );
  }
}