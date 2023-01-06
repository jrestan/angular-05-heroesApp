import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
    mat-card {
      margin-top: 20px;
    }
    `
  ]
})
export class HeroeTarjetaComponent /*implements OnInit*/ {

  @Input() heroe!: Heroe; //puede ser asi, es correcto

  //@Input() heroe: Heroe | undefined;  //tambien puede ser asi
  

  /*
  constructor() { }

  ngOnInit(): void {
  }
  */

}
