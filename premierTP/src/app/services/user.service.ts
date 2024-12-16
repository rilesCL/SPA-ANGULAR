import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { IUserCreate } from '../interfaces/user.interface';
import { catchError, map } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  createUser(userData:IUserCreate){
    return this.http.post(`${this.apiUrl}/create-user`, {
      username: userData.username,
      password: userData.password,
      email: userData.email,
      key: 'cal41202'
    }).pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }

  getUserProfile() {
    const token = localStorage.getItem('token');
    console.log('Token utilisé:', token);
    return this.http.get(`${this.apiUrl}/secret`, {
        headers: { 'Authorization': token || '' }
      }).pipe(
        catchError((error) => {
          return this.errorHandler.handleError(error);
        })
      );
    }

  
  updateProfile(updates:{nom?:string, prenom?:string}){
    const token = localStorage.getItem('token');
    return this.http.patch(`${this.apiUrl}/profile`, updates, {
      headers: { 'Authorization': token || '' }
    }).pipe(
      catchError((error) => {
        return this.errorHandler.handleError(error);
      })
    );
  }
}
