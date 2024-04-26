import { Component, Inject, OnInit } from '@angular/core';
import { LoginServiceService } from '../service/login-service.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {login: '', senha: ''};

  constructor(private loginService: LoginServiceService, private router: Router){}

  ngOnInit(): void {
    if(localStorage.getItem('token') !== null && localStorage.getItem('token')?.toString().trim !== null){
      this.router.navigate(['home']);
    }
  }

  public login(){
    //console.info("User" + this.usuario.login);
    this.loginService.login(this.usuario);
  }

  public recuperar(){
    this.loginService.recuperar(this.usuario.login);
  }
}


