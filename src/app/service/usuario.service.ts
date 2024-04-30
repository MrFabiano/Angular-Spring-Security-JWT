import { UserReport } from 'src/app/model/userreport';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { User } from '../model/user';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  user: User = new User;
  //datePipe: any;
  constructor(private httpClient: HttpClient, public dialog: MatDialog,) {}

  getProfissaoList(): Observable<any>{
    return this.httpClient.get<any>(AppConstants.baseUrlPath);
  }

  getListUser(): Observable<any>{
    return this.httpClient.get<any>(AppConstants.baseUrl);
  }

  getListPage(pagina: any): Observable<any>{
    return this.httpClient.get<any>(AppConstants.baseUrl + 'page/' + pagina);
  }

  getUserPageName(nome: string, page: number): Observable<any>{
    return this.httpClient.get<any>(AppConstants.baseUrl + 'userByName/' + nome + '/page/' + page);
  }

  deleteUser(id: number) : Observable<any>{
       return this.httpClient.delete(AppConstants.baseUrl + id, {responseType : 'text'});
  }

  consultUser(nome: string) : Observable<any>{
    return this.httpClient.get<any>(AppConstants.baseUrl + 'userByName/' + nome);
  }

  getUserConsult(id: any): Observable<any>{
    return this.httpClient.get<any>(AppConstants.baseUrl + id);
  }

  postSaveUser(user: User): Observable<User>{
    return this.httpClient.post<User>(AppConstants.baseUrl, user);
  }

  updateSaveUser(id: number, user: User): Observable<User>{
    const url = `${AppConstants.baseUrl}${id}`;
    user.telefones = this.user.telefones;
    return this.httpClient.put<User>(url, user);
  }

  userAutenticado(){
    if(localStorage.getItem('token') !== null 
        && localStorage.getItem('token')?.toString().trim !== null){
        return true;
    } else{
      return false;
    }
  }

  removePhone(id: any){
    return this.httpClient.delete(AppConstants.baseUrl + 'removePhone/' + id, {responseType: 'text'});
  }

  downloadPdfReport() {
    // Faça a solicitação HTTP para baixar o relatório em PDF e retorne o observable
    return this.httpClient.get(AppConstants.baseUrlReport, {responseType: 'text'}).subscribe(data => {
      document.querySelector('iframe')!.src = data;
    });
  }
  
  downloadPdfReportParam(userReport: UserReport){
    const date: Date = new Date(); // Substitua pela data atual
    const dataInicio = new DatePipe('en-US').transform(userReport.dataInicio, 'dd/MM/yyyy');
    const dataFim = new DatePipe('en-US').transform(userReport.dataFim, 'dd/MM/yyyy');
    // Remova completamente a opção { responseType: 'text' as 'json' } para tratar a resposta de acordo com o padrão (JSON)
    return this.httpClient.post(AppConstants.baseUrlReport,  { dataInicio, dataFim }, { responseType: 'arraybuffer' })
      .subscribe((data: ArrayBuffer | Blob) => { // Adicione a tipagem explícita aqui
        // Verifique se a resposta é um ArrayBuffer ou Blob antes de processá-la
        if (data instanceof ArrayBuffer || data instanceof Blob) {
          // Prossiga com o processamento dos dados, como definir a origem do PDF para o iframe
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          document.querySelector('iframe')!.src = url;
          setTimeout(() => window.URL.revokeObjectURL(url), 10000);
        } else {
          console.error('Resposta inválida. Os dados não são um ArrayBuffer ou Blob.');
        }
      }, error => {
        console.error('Erro ao fazer a solicitação para baixar o relatório em PDF:', error);
      });
  }
  
  loadGraph():Observable<any> {
    return this.httpClient.get<any>(AppConstants.baseUrl + 'graphic');
  }
}

                                                                                                          