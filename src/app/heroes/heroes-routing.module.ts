import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {
     path: '',
     component: HomeComponent,
     children: [
      {
        path: 'listado',
        component: ListadoComponent
      },
      {
        path: 'agregar',
        component: AgregarComponent
      },
      {
        path: 'editar/:id',
        component: AgregarComponent //
      },
      {
        path: 'buscar',
        component: BuscarComponent
      },
      {
        path: ':id',   //Al poner esto, y al poner /heroe/ashdkjahsdlkajs  va a asumir que ese 'cualquier cosa es un id por lo tanto va a llevar a HeoreComponent'
        component: HeroeComponent  //y nunca se va a cumplir el '**' de la linea de abajo...
      },
      {
        path: '**',
        redirectTo: 'listado'
      }
     ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    //CommonModule
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule { }
