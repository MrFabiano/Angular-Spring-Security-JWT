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

  getListUser(): Observable<any>{
    return this.httpClient.get<any>(AppConstants.baseUrl);
  }

  deleteUser(id: number) : Observable<any>{
       return this.httpClient.delete(AppConstants.baseUrl + id, {responseType : 'text'});
  }

  consultUser(nome: string) : Observable<any>{
    return this.httpClient.get<any>(AppConstants.baseUrl + "userByName/" + nome);
  }

  getUserConsult(id: any): Observable<any>{
    return this.httpClient.get<any>(AppConstants.baseUrl + id);
  }

  postSaveUser(user: any): Observable<any>{
    return this.httpClient.post<any>(AppConstants.baseUrl, user);
  }

  updateSaveUser(user: any): Observable<any>{
    return this.httpClient.put<any>(AppConstants.baseUrl, user);
  }

  userAutenticado(){
    if(localStorage.getItem('token') !== null 
        && localStorage.getItem('token')?.toString().trim !== null){
        return true;
    } else{
      return false;
    }
  }
}

