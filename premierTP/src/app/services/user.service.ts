import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { IUserCreate } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createUser(userData:IUserCreate){
    return this.http.post(`${this.apiUrl}/create-user`, {
      username: userData.username,
      password: userData.password,
      email: userData.email,
      key: 'cal41202'
    });
  }

  getUserProfile(){
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/profile`, {
      headers: { 'Authorization': token || '' }
    });
  }

  updateProfile(updates:{nom?:string, prenom?:string}){
    const token = localStorage.getItem('token');
    return this.http.patch(`${this.apiUrl}/profile`, updates, {
      headers: { 'Authorization': token || '' }
    });
  }

}
