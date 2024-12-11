import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {
  private apiUrl = environment.apiUrl;
  

  constructor(private http: HttpClient) {}

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
  });
}

getCurrentActivity() {
  const token = localStorage.getItem('token');
  return this.http.get(`${this.apiUrl}/activite`, {
    headers: { 'Authorization': token || '' }
  });
}
createManualEntry(data: {description: string, start: string, end: string}) {
  const token = localStorage.getItem('token');
  return this.http.put(`${this.apiUrl}/activite`, data, {
    headers: { 'Authorization': token || '' }
  });
}

}
