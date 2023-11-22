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
}

