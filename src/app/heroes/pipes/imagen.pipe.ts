import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
  //pure: false  //con esto se logro que la imagen se actualice al cambiar el campo alt_img del json en agregar.component5, pero consume muchos recursos...
})
export class ImagenPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  
  transform(heroe: Heroe): string {

    console.log("se disparo el pipe imagem")

    if(!heroe.id && !heroe.alt_img){
      return `assets/no-image.png`;
    }
    else if(heroe.alt_img){
      return heroe.alt_img; //imagen alternativa
    }
    return `assets/heroes/${heroe.id}.jpg`;
  }
}
