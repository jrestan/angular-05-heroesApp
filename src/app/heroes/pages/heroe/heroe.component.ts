import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';   //tambien funciona si lo importa solo de rxjs
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;    
  
  constructor( private activatedRoute: ActivatedRoute,
               private heroesService: HeroesService,
               private router: Router) { }

  ngOnInit(): void {
    //this.heroe.superhero

    //console.log("Hola");

    /*
    //Esto tambien funciona bien

    this.activatedRoute.params
      //.subscribe(console.log)
      .subscribe( ({ id })=> {   //se desestructura
        console.log(id);
        
        this.heroesService.getHeroe(id).subscribe(heroe=>{
          console.log(heroe);
          this.heroe=heroe;
        })
      } );
    */
    
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=>this.heroesService.getHeroe(id)),
      tap(console.log)
    )
    .subscribe(heroe=>{
      //console.log(heroe);
      this.heroe = heroe;
    })
            
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
