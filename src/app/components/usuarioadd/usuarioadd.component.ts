import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsuarioService } from 'src/app/service/usuario.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './usuarioadd.component.html',
  styleUrls: ['./usuarioadd.component.css']
})
export class UsuarioaddComponent implements OnInit {

  user: User = {} as User;

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService){}

  ngOnInit(): void {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if(id != null){
      this.userService.getUserConsult(id).subscribe(data =>{
        this.user = data;
      });
    }
  }

  saveUser(){
    if(this.user.id != null && this.user.id.toString().trim() != null){ /*atualizando ou editando*/
           this.userService.updateSaveUser(this.user).subscribe(data =>{
            this.novo();
                 console.info("Atualizado" + data);
           });
    }else{
      this.userService.postSaveUser(this.user).subscribe(data =>{
        this.novo();
            console.info("Gravou user: " + data);
      });
    }
  }

  novo(){
  this.user = {} as User;
  }
}
