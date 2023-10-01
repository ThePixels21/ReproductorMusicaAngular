import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistsComponent } from './playlists.component';
import { NavbarModule } from '../navbar/navbar.module';
import { BarraBusquedaModule } from '../barra-busqueda/barra-busqueda.module';


@NgModule({
  declarations: [
    PlaylistsComponent
  ],
  imports: [
    CommonModule,
    PlaylistsRoutingModule,
    NavbarModule,
    BarraBusquedaModule
  ],
  exports: [
    PlaylistsComponent
  ]
})
export class PlaylistsModule { }
