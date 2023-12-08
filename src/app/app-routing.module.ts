import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioaddComponent } from './components/usuarioadd/usuarioadd.component';
import { GuardsService } from './service/guard/guards.service';
import { UsuarioReportComponent } from './components/usuario-report/usuario-report.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';


const routes: Routes = [
  { path: 'home', component : HomeComponent, canActivate: [GuardsService]},
  { path: 'login', component : LoginComponent },
  { path: '', component : LoginComponent },
  { path: 'userList', component : UsuarioComponent, canActivate: [GuardsService] },
  { path: 'userAdd', component : UsuarioaddComponent, canActivate: [GuardsService] },
  { path: 'userAdd/:id', component : UsuarioaddComponent, canActivate: [GuardsService] },
  { path: 'userReport', component : UsuarioReportComponent, canActivate: [GuardsService] },
  { path: 'chart', component : BarChartComponent, canActivate: [GuardsService] },
   
 ];

 //export const optionsMask: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
