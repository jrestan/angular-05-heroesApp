import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private route: Router,
              private authService: AuthService ) { }

  ngOnInit(): void {
  }

  login(){
    //ir al backend

    //un usuario

    this.authService.login()
      .subscribe(resp=>{
        console.log(resp);

        if(resp.id){
          this.route.navigate(['./heroes']);
        }

      });

  }

  ingresarSinLogin(){
    this.authService.logout();  //Si no se ha hecho un F5 o se ha actualizado la pagina, aun habiendo borrado los datos se puede navegar hacia ./heroes
    this.route.navigate(['./heroes']);
  }

}
