import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  users! : User[];
  nome! : string;

constructor(private usuarioService: UsuarioService, private router: Router){}

  ngOnInit(): void {
    this.usuarioService.getListUser().subscribe(data =>{
        this.users = data;
    });
  }

  deleteUser(id: number){
   this.usuarioService.deleteUser(id).subscribe(data => {
    console.log("Retorno do métod delete : " + data);
    this.usuarioService.getListUser().subscribe(data =>{
    this.users = data;
       });
   });
  }

  consulterUser(){
    this.usuarioService.consultUser(this.nome).subscribe(data =>{
        this.users = data;
    });
  }

  public sair(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

}

