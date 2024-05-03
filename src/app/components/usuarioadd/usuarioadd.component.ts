import { Telefone } from './../../model/telefone';
import { User } from './../../model/user';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService } from 'src/app/service/usuario.service';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Profissao } from 'src/app/model/profissao';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';




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


  user: User = new User();

  profissoes!: Array<Profissao>;

  telefones: Telefone = new Telefone();


  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService, 
    private router: Router, private snackBar: MatSnackBar,
     public dialog: MatDialog){}

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
           this.userService.updateSaveUser(this.user.id, this.user).subscribe(data =>{
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
    console.log('deleteUser method called');
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Do you want to remove this user?',
   });

    dialogRef.afterClosed().subscribe((result: boolean) => { 
     if(result){
      console.log('About to call phone');
      this.userService.removePhone(id).subscribe(
        () => {
          console.log('Phone deleted successfully');
          location.reload();
          this.snackBar.open('Phone removed successfully', 'X', { 
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.user.telefones?.splice(i, 1);
          },
          () => this.onError('Error when trying to remove phone')
       );
     }
    });
 }
  
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent,{
      data: errorMsg
    });
  }

  addPhone(){
    if (!this.user.telefones) {
      this.user.telefones = []; // Inicializa o array de telefones se ainda não estiver definido
  }
  // Cria um novo objeto de telefone com o número do telefone
  const novoTelefone: Telefone = {
      id: null,
      numero: this.telefones.numero // Use o número de telefone do objeto telefones do componente, não o objeto telefones em si
  };
  // Adiciona o novo telefone ao array de telefones do usuário
  this.user.telefones.push(novoTelefone);
}
    
  novo(){
  this.user = new User();
  this.telefones = new Telefone();
  }

  trackByTelefone(index: number, telefone: Telefone) {
   return telefone.id; // Utilize o ID do telefone ou outra propriedade única
  }
}
