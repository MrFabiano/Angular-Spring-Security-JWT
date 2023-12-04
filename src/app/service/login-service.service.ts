import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  recuperar(login: any){

    let user = new User();
    user.login = login;

    return this.httpClient.post(AppConstants.baseUrlPathRecuperar, user).subscribe(data => {
      alert(JSON.parse(JSON.stringify(data)).error);
  
  },
  error => {
      console.error("Error ao recuperar login");
      alert('Erro ao recuperar login');
    }
  );
 }

  login(user: any){
    return this.httpClient.post(AppConstants.baseLogin, JSON.stringify(user)).pipe().subscribe(data => {
      
           var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

           localStorage.setItem("token", token);

           console.info("Token: " + localStorage.getItem("token"));

           this.router.navigate(['home']);

  },
  error => {
      alert("Erro ao fazer o login");
      console.error("Error ao fazer login");
    }
  );
 }
} 
