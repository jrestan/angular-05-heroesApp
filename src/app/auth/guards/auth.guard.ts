import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
  {
    console.log('canActivate', this.authService.auth)

    // if (this.authService.auth.id) {
    //   return true;
    // }

    // console.log('Bloqueado por Guard - canActivate');
    // return false;

    return this.authService.verificaAutenticacion()
              .pipe(
                tap( estaAutenticado=>{
                  if(!estaAutenticado){
                    this.router.navigate(['./auth/login']);
                  }
                }
                )
              );

  }


  canLoad(
    route: Route,
    //segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean 
  {

    console.log('canLoad', this.authService.auth)

    // if (this.authService.auth.id) {
    //   return true;
    // }

    // console.log('Bloqueado por Guard - canLoad');
    // return false;

    return this.authService.verificaAutenticacion()
              .pipe(
                tap( estaAutenticado=>{
                  if(!estaAutenticado){
                    this.router.navigate(['./auth/login']);
                  }
                }
                )
              );
  }
}
