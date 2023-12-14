import { Component, Injectable, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UserReport } from 'src/app/model/userreport';

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
  override toModel(date: NgbDateStruct | null) {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
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

  override format(date: NgbDateStruct | null){
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }


  toModel(date: NgbDateStruct | null) {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
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
  templateUrl: './usuario-report.component.html',
  styleUrls: ['./usuario-report.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass : FormateDate}, 
  {provide: NgbDateAdapter, useClass : FormatDateAdapter}]
})
export class UsuarioReportComponent {

  userReport = new UserReport();
  //report: Report = {} as Report;
  //userReport: UserReport = {} as UserReport;

  constructor(private userService: UsuarioService){}

  ngOnInit(): void {}

  printReportDate(){
    this.userService.downloadPdfReportParam(this.userReport);
  }
}

