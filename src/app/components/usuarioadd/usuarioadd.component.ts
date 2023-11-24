import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../model/user';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
  selector: 'app-root',
  templateUrl: './usuarioadd.component.html',
  styleUrls: ['./usuarioadd.component.css']
})
export class UsuarioaddComponent implements OnInit{

  usuario!: User;

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService){}

  ngOnInit(): void {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if(id != null){
      this.userService.getUserConsult(id).subscribe(data =>{
        this.usuario = data;
      });
    }
  }

  saveUser(){
    
    if(this.usuario.id != null && this.usuario.id.toString().trim != null)/*atualizando ou editando*/{
           this.userService.updateSaveUser(this.usuario).subscribe(data =>{
                 console.info("Atualizado" + data);
           });
    }else{
      this.userService.getSaveUser(this.usuario).subscribe(data =>{
            console.info("Gravou user: " + data);
      });
    }
  }

  novo(){
    this.usuario;
  }
}
