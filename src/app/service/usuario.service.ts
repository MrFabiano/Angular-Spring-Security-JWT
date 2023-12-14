import { UserReport } from 'src/app/model/userreport';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';





@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //datePipe: any;


  
  constructor(private httpClient: HttpClient) {}

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

  postSaveUser(user: any): Observable<any>{
    return this.httpClient.post<any>(AppConstants.baseUrl, user);
  }

  updateSaveUser(user: any): Observable<any>{
    return this.httpClient.put<any>(AppConstants.baseUrl, user);
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

  downloadPdfReport(){
    return this.httpClient.get(AppConstants.baseUrl + 'report', {responseType: 'text'}).subscribe(data => {
      document.querySelector('iframe')!.src = data;

    });
  }

  downloadPdfReportParam(userReport: UserReport){
    const date: Date = new Date(); // Replace with your actual date
    const dataInicio = new DatePipe('en-US').transform(userReport.dataInicio, 'dd/MM/yyyy');
    const dataFim = new DatePipe('en-US').transform(userReport.dataFim, 'dd/MM/yyyy');
    return this.httpClient.post<any>(AppConstants.baseUrl + 'report/', {responseType: 'text', dataInicio, dataFim}).subscribe(data => {
        document.querySelector('iframe')!.src = data;
    });
   
  }

  loadGraph():Observable<any> {
    return this.httpClient.get<any>(AppConstants.baseUrl + 'graphic');
  }

}

                                                                                                          