import { Component, EventEmitter, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, first, of, tap } from 'rxjs';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Pipe({
  name: 'cpfMask'
})
export class CpfMaskPipe implements PipeTransform {
  transform(value: string): string {
      if (!value) {
          return '';
      }

      value = value.replace(/\D/g, '');

      if (value.length > 11) {
          value = value.substring(0, 11);
      }

      const parts = [];
      parts.push(value.substring(0, 3));
      parts.push('.');
      parts.push(value.substring(3, 6));
      parts.push('.');
      parts.push(value.substring(6, 9));
      parts.push('-');
      parts.push(value.substring(9, 11));

      return parts.join('');
  }
}


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  
})
export class UsuarioComponent implements OnInit {

  user: User = new User;
  users!: Array<User>;
  nome!: string;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

constructor(private usuarioService: 
  UsuarioService, private router: Router, 
  private snackBar: MatSnackBar,
  public dialog: MatDialog,){}

  ngOnInit(): void {
    this.usuarioService.getListUser().pipe(first()).subscribe(data =>{
        this.users = data.content;
        this.count = data.totalElements;
    });
  }

 deleteUser(id: number, index: any){
  console.log('deleteUser method called');
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Do you want to remove this user?',
   });

    dialogRef.afterClosed().subscribe((result: boolean) => { 
     if(result){
      console.log('About to call usuarioService.deleteUser');
      this.usuarioService.deleteUser(id).subscribe(
        () => {
          console.log('User deleted successfully');
          location.reload();
          this.snackBar.open('User removed successfully', 'X', { 
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.users.splice(index, -1);
          },
          () => this.onError('Error when trying to remove user')
       );
     }
    });
 }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent,{
      data: errorMsg
    });
  }

  consulterUser(){
    if(this.nome === ''){
      this.usuarioService.getListUser().pipe(first()).subscribe(data =>{
        this.users = data.content;
        this.count = data.totalElements;
    });

    }else{

    this.usuarioService.consultUser(this.nome).subscribe(data =>{
        this.users = data.content;
        this.count = data.totalElements;
    });
  }
}

  public sair(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  carregarPagina(pagina: any){
    if(this.nome !== ''){
      this.usuarioService.getUserPageName(this.nome, (pagina -1)).subscribe(data =>{
        this.users = data.content;
        this.count = data.totalElements;
    });
    }else{
    this.usuarioService.getListPage(pagina).pipe(first()).subscribe(data =>{
      this.users = data.content;
      this.count = data.totalElements;
  });
  }
 }

 printReport(){
  return this.usuarioService.downloadPdfReport();
  }

}




