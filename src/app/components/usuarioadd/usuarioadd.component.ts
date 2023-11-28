import { Telefone } from './../../model/telefone';
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

  telefone: Telefone = {} as Telefone;

  //telefone = new Telefone();

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

  deletePhone(id: any, i: any){
    if(id === null){
      this.user.telefones?.splice(i,1);
    }

    if(id !== null && confirm("Deseja remover?")){
         this.userService.removePhone(id).subscribe(data => {
          // const index = this.user.telefones?.indexOf(id);//Identifica posição da lista de telefone removido
          // this.user.telefones?.splice(index! - 1, 1); //remove o telefone da lista
          //    console.info('Telefone removido' + data);
          this.user.telefones?.splice(i, 1);
         });
    }
  }

  addPhone(){
      if(this.user.telefones === undefined){
        //this.user.telefones = {} as Telefone[];
        this.user.telefones = new Array<Telefone>();
      }

      this.user.telefones.push(this.telefone);
      this.telefone = {} as Telefone;
      //this.telefone = new Telefone();
  }

  novo(){
  this.user = {} as User;
  this.telefone = {} as Telefone;
  }
}
