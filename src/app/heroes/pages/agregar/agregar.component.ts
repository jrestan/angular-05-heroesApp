import { Component, OnInit } from '@angular/core';
import { Publisher, Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: Publisher.DCComics,
      desc: Publisher.DCComics
    },
    {
      id: Publisher.MarvelComics,
      desc: Publisher.MarvelComics
    }
  ];

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: ''
  }
  
  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snakbar: MatSnackBar,
              public dialog: MatDialog) { }
  
  ngOnInit(): void {
    
    //this.activatedRoute.params.
    //  subscribe(({id})=> console.log("Id:", id));

    if(this.router.url.includes('editar')){
      this.activatedRoute.params
        .pipe(
          switchMap(({id})=>this.heroesService.getHeroe(id))
        )
        .subscribe(heroe=>this.heroe=heroe);
    }

  }

  guardar(){
    if(this.heroe.superhero.trim().length===0){
      return;
    }

    if(this.heroe.id){
      //Actualizar
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe=>{
          console.log("Actualizando", heroe);
          //this.router.navigate(['/heroes/editar',heroe.id]);
          this.mostrarSnakbar("Registro actualizado correctamente");

        });
    }
    else{
      //Crear
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe=>{
          console.log("Respuesta", heroe);
          this.router.navigate(['/heroes/editar',heroe.id]);
          this.mostrarSnakbar("Registro creado correctamente");
        });
    }
  }

  borrarHeroe(){

    const dialog = this.dialog.open(ConfirmarComponent,{width:"250px", data: this.heroe});

    dialog.afterClosed().subscribe(
      (result)=>{
        if(result){
          this.heroesService.borrarHeroe(this.heroe.id!)
            .subscribe(resp=>{
              this.router.navigate(['heroes']);
              this.mostrarSnakbar("Registro eliminado correctamente");
            });
        }
      }
    );

  }

  mostrarSnakbar(mensaje: string){
    this.snakbar.open(mensaje, 'Cerrar', {duration:2500});
  }

}
