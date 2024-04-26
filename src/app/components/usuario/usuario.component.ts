import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, first } from 'rxjs';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';

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

  //users! : User[];
  users!: Array<User>;
  //users!: Array<User>;
  nome!: string;
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

constructor(private usuarioService: UsuarioService, private router: Router){}

  ngOnInit(): void {
    this.usuarioService.getListUser().pipe(first()).subscribe(data =>{
        this.users = data.content;
        this.count = data.totalElements;
    });
  }

  deleteUser(id: number, index: any){
    if(confirm('Deseja mesmo remover?')){
      
      this.usuarioService.deleteUser(id).subscribe(data => {
        console.log("Retorno do métod delete : " + data);

        // this.usuarioService.getListUser().subscribe(data =>{
        // this.users = data;
        //    });
       this.users.splice(index, -1); //Remove tela
       location.reload();
          
       });
    }
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

