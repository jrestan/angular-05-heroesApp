import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl

  private _auth: Auth | undefined;

  constructor(private http: HttpClient) { }

  get auth(){
    return {...this._auth}   //este get se ejecuta en home.component.ts para mostrar el nombre del usuario logueado
  }

  verificaAutenticacion(): Observable<boolean> {  //podria devolver ambos tipos de datos Observable<boolean> | boolean
    
    if(!localStorage.getItem('token')){
      return of(false);
      //return false; //es posible porque en la declaracion ademas del Observable se permite boolean
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map(auth=>{                    //tratar de entender la diferencia entre map y tap
          console.log('map', auth);    //lo que pasa es que con "map" pude cambiar el valor de retorno a boolean, con "tap" siempre hubiera sido Auth
          this._auth = auth;
          return true;
        })
      );
    
    //return of(true);
    //return true;
  }

  login(): Observable<Auth>{
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(auth => this._auth = auth),  //Esto se va a ejecutar antes que el subscribe que esta en el login.component.ts que ejecuta esta funciuon..
        tap(auth => localStorage.setItem('token', auth.id))  //para no hacer doble tap se hubiera podido abrir llaves en la anterior linea
      );
  }

  logout(){
    this._auth = undefined;
  }


}
