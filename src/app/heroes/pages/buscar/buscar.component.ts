import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = "";

  heroes: Heroe[] = [];

  /*
  heroeNoFound: Heroe[] = [{
    superhero: 'No se encontro elemento',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    id:""
  }];
  len: number = 0;
  */

  heroeSeleccionado!: Heroe | undefined;

  constructor(private heroesServise: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesServise.getSugerencias(this.termino)
      .subscribe(heroes=>{
        this.heroes=heroes
        /*
        if(this.heroes.length===0){
          this.heroes = this.heroeNoFound;
        }*/
      });
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){
    //console.log(event.option.value);
    //console.log(event);

    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }

    
    const heroe: Heroe = event.option.value;
    console.log(heroe);

    /*
    if(heroe.id){
      console.log("termino existente");
      this.termino = heroe.superhero;

      this.heroesServise.getHeroe(heroe.id!)
        .subscribe(heroe=>this.heroeSeleccionado = heroe);
    }
    else{
      this.termino = "";
    }*/
    
    this.termino = heroe.superhero;

    this.heroesServise.getHeroe(heroe.id!)
      .subscribe(heroe=>this.heroeSeleccionado = heroe);
    
  }

}
