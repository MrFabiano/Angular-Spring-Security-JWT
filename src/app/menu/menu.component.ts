import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  constructor(private router: Router){}

  ngOnInit(): void {}

  public sair(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public esconderBarra(){
    if(localStorage.getItem('token') !== null
             && localStorage.getItem('token')?.toString().trim !== null){
        return false;
    }else{
      return true;
    }
  }

}
