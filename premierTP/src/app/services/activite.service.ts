import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Observable, Subject, tap } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {
  private apiUrl = environment.apiUrl;
  private activityStateChanged = new Subject<void>();
  activityStateChanged$ = this.activityStateChanged.asObservable();


  constructor(
    private http: HttpClient,
    private error : ErrorHandlerService

  ) {}

  demarrerActivite(description:string){
    const token = localStorage.getItem('token');
    const body = { description: description };  // S'assurer que c'est dans le bon format
    console.log("token utilise pour l'envoi de la requete:", token);
    console.log('Envoi de la requête:', body); 
    return this.http.post(`${this.apiUrl}/activite`,  body , {
      headers: { 'Authorization': token || '' }
    });
}

arreterActivite(){
   const token = localStorage.getItem('token');
  return this.http.delete(`${this.apiUrl}/activite`, {
    headers: { 'Authorization': token || '' }
  }).pipe(
    tap(() => {
      // Notifier que l'état a changé
      this.activityStateChanged.next();
    })
  );
}
getCurrentActivity() {
  const token = localStorage.getItem('token');
  return this.http.get(`${this.apiUrl}/activite`, {
    headers: { 'Authorization': token || '' }
  });
}
createManualEntry(data: {description: string, start: string, end: string}) {
  const token = localStorage.getItem('token');
  console.log('Envoi entrée manuelle:', data);

  return this.http.put(`${this.apiUrl}/activite`, data, {
      headers: { 
          'Authorization': token || '',
          'Content-Type': 'application/json'
      }
  });
}

getAllActivities(): Observable<ActivityResponse[]> {
  const token = localStorage.getItem('token');
  console.log('Token pour getAllActivities:', token);

  return this.http.get<ActivityResponse[]>(`${this.apiUrl}/activites`, {
    headers: { 'Authorization': token || '' }
  });
}

}

interface ActivityResponse {
  userid: string;
  description: string;
  id: string;
  debut: {
    value: string;
  };
  fin: {
    value: string;
  } | null;
}
