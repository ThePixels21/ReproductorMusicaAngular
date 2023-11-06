import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarraBusquedaRoutingModule } from './barra-busqueda-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchResultsArtistsComponent } from './search-results-artists/search-results-artists.component';
import { SearchResultsPlaylistsComponent } from './search-results-playlists/search-results-playlists.component';


@NgModule({
  declarations: [
    BarraBusquedaComponent,
    SearchResultsComponent,
    SearchResultsArtistsComponent,
    SearchResultsPlaylistsComponent
  ],
  imports: [
    CommonModule,
    BarraBusquedaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    BarraBusquedaComponent,
    SearchResultsComponent,
    SearchResultsArtistsComponent,
    SearchResultsPlaylistsComponent
  ]
})
export class BarraBusquedaModule { }
