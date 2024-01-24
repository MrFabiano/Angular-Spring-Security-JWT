import { Telefone } from './../../model/telefone';
import { User } from './../../model/user';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsuarioService } from 'src/app/service/usuario.service';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Profissao } from 'src/app/model/profissao';




@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  override fromModel(value: string | null): NgbDateStruct | null {
    if(value){
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
     return null;
  }
  override toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }

}

@Injectable()
export class FormateDate extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  override parse(value: string): NgbDateStruct | null {
     if(value){
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
     return null;
  }

  override format(date: NgbDateStruct | null): string {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }


  toModel(date: NgbDateStruct | null): string | null{
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

function validarDia(valor: any) {
    if(valor.toString !== '' && parseInt(valor) <= 9){
      return '0' + valor;
    } else {
      return valor;
    }
 
  }

@Component({
  selector: 'app-root',
  templateUrl: './usuarioadd.component.html',
  styleUrls: ['./usuarioadd.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass : FormateDate}, 
  {provide: NgbDateAdapter, useClass : FormatDateAdapter}]
})
export class UsuarioaddComponent implements OnInit {

  //user: User = {} as User;
  user = new User();

  profissoes!: Array<Profissao>;

  telefone = new Telefone();
  
  //profissoes!: Profissao[];

  //telefone: Telefone = {} as Telefone;

 // profissoes!: Profissao[] | undefined;

  //telefone = new Telefone();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService){}

  ngOnInit(): void {

    this.userService.getProfissaoList().pipe().subscribe(data => {
           this.profissoes = data;
    });

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
      //this.telefone = {} as Telefone;
      this.telefone = new Telefone();
  }

  novo(){
  // this.user = {} as User;
    //this.telefone = {} as Telefone;
  this.user = new User();
  this.telefone = new Telefone();
  }
}
