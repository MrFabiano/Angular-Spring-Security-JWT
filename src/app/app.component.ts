import { CSP_NONCE, Component } from '@angular/core';
import { LoginServiceService } from './login-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-project-spring';

  usuario = {login: '', senha: ''};

  constructor(private loginService: LoginServiceService){}

  public login(){
    //console.info("User" + this.usuario.login);
    this.loginService.login(this.usuario);
  }
}
