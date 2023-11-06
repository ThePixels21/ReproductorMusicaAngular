import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { ArtistsComponent } from './artists/artists.component';
import { BarraBusquedaModule } from '../barra-busqueda/barra-busqueda.module';
import { NavbarModule } from '../navbar/navbar.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSongsComponent } from './profile-songs/profile-songs.component';
import { ProfilePlaylistsComponent } from './profile-playlists/profile-playlists.component';
import { ProfilePlaylistComponent } from './profile-playlist/profile-playlist.component';


@NgModule({
  declarations: [
    ArtistsComponent,
    ProfileComponent,
    ProfileSongsComponent,
    ProfilePlaylistsComponent,
    ProfilePlaylistComponent
  ],
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    NavbarModule,
    BarraBusquedaModule
  ],
  exports: [
    ArtistsComponent,
    ProfileComponent,
    ProfileSongsComponent,
    ProfilePlaylistsComponent,
    ProfilePlaylistComponent
  ]
})
export class ArtistsModule { }
