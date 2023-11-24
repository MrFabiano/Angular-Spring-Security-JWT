import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { User } from '../model/user';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private httpClient: HttpClient) {}

  getListUser(): Observable<User[]>{
    return this.httpClient.get<User[]>(AppConstants.baseUrl);
  }

  deleteUser(id: number) : Observable<any>{
       return this.httpClient.delete(AppConstants.baseUrl + id, {responseType : 'text'});
  }

  consulteUser(nome: string) : Observable<any>{
    return this.httpClient.get(AppConstants.baseUrl + "userByName/" + nome);
  }

  getUserConsult(id: any): Observable<any>{
    return this.httpClient.get(AppConstants.baseUrl + id);
  }

  getSaveUser(user: any): Observable<any>{
    return this.httpClient.post(AppConstants.baseUrl, user);
  }

  updateSaveUser(user: any): Observable<any>{
    return this.httpClient.put(AppConstants.baseUrl, user);
  }
}

