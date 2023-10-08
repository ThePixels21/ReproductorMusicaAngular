import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistsComponent } from './artists/artists.component';
import { BarraBusquedaModule } from '../barra-busqueda/barra-busqueda.module';
import { NavbarModule } from '../navbar/navbar.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    ArtistsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    NavbarModule,
    BarraBusquedaModule
  ],
  exports: [
    ArtistsComponent,
    ProfileComponent
  ]
})
export class ArtistsModule { }
