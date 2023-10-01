import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistsComponent } from './artists.component';
import { BarraBusquedaModule } from '../barra-busqueda/barra-busqueda.module';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [
    ArtistsComponent
  ],
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    NavbarModule,
    BarraBusquedaModule
  ],
  exports: [
    ArtistsComponent
  ]
})
export class ArtistsModule { }
