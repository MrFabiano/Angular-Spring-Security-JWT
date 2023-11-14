import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(usuario: any){
    return this.httpClient.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {
           
           var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

           localStorage.setItem("token", token);

           console.info("Token: " + localStorage.getItem("token"));

           this.router.navigate(['home']);

  },
  error => {
      console.error("Error ao fazer login");
    }
  );
 }
}
