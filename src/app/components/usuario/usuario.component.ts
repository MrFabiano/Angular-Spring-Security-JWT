import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';





@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  users!: User[];

constructor(private usuarioService: UsuarioService, private router: Router){}

  ngOnInit(): void {
    this.usuarioService.getListUser().subscribe(data =>{
        this.users = data;
    });
  }

  public sair(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}

