import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { ArtistsComponent } from './artists/artists/artists.component';
import { ItemsComponent } from './items/items.component';
import { UploadSongComponent } from './upload-song/upload-song.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProfileComponent } from './artists/profile/profile.component';
import { SearchResultsComponent } from './barra-busqueda/search-results/search-results.component';
import { PlaylistsComponent } from './playlists/playlists/playlists.component';
import { MySongsComponent } from './my-profile/my-songs/my-songs.component';
import { MyPlaylistsComponent } from './my-profile/my-playlists/my-playlists.component';
import { PlaylistComponent } from './my-profile/playlist/playlist.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: InicioComponent,
    children: [
      {
        path: 'home',
        component: ItemsComponent
      },
      {
        path: 'home/search/:keyword',
        component: SearchResultsComponent
      },
      {
        path: 'playlists',
        component: PlaylistsComponent
      },
      {
        path: 'artists',
        component: ArtistsComponent
      },
      {
        path: 'artists/profile/:nickname',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'register',
    component: RegistroComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'upload',
    component: UploadSongComponent
  },
  {
    path: 'my-profile/:nickname',
    component: MyProfileComponent,
    children: [
      {
        path: 'songs',
        component: MySongsComponent
      },
      {
        path: 'playlists',
        component: MyPlaylistsComponent
      },
      {
        path: 'playlists/:playlistId',
        component: PlaylistComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
