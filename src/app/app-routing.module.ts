import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioaddComponent } from './components/usuarioadd/usuarioadd.component';

const routes: Routes = [
  { path: 'home', component : HomeComponent },
  { path: 'login', component : LoginComponent },
  { path: '', component : LoginComponent },
  { path: 'userList', component : UsuarioComponent },
  { path: 'userAdd', component : UsuarioaddComponent },
  { path: 'userAdd/:id', component : UsuarioaddComponent },
   
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
