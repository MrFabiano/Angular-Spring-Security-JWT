import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorModule } from './interceptor/header-interceptor.service';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { MenuComponent } from './menu/menu.component';
import { UsuarioaddComponent } from './components/usuarioadd/usuarioadd.component';
import { NgxMaskDirective, provideNgxMask  } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxCurrencyDirective } from "ngx-currency";
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { UsuarioReportComponent } from './components/usuario-report/usuario-report.component';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    MenuComponent,
    UsuarioaddComponent,
    ConfirmationDialogComponent,
    UsuarioReportComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    HttpInterceptorModule,
    NgxMaskDirective,
    NgxPaginationModule,
    MatPaginatorModule,
    NgxCurrencyDirective,
    NgChartsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
 
   ],
  providers: [provideNgxMask({ /* opções de cfg */ })],
  bootstrap: [AppComponent]
 
})
export class AppModule { }
