import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  { path: 'home', component : HomeComponent },
  { path: 'login', component : LoginComponent },
  { path: '', component : LoginComponent },
  { path: 'userList', component : UsuarioComponent },
   
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
