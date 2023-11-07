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
import { MyPlaylistComponent } from './my-profile/my-playlist/my-playlist.component';
import { ProfileSongsComponent } from './artists/profile-songs/profile-songs.component';
import { ProfilePlaylistsComponent } from './artists/profile-playlists/profile-playlists.component';
import { ProfilePlaylistComponent } from './artists/profile-playlist/profile-playlist.component';
import { SearchResultsArtistsComponent } from './barra-busqueda/search-results-artists/search-results-artists.component';
import { SearchResultsPlaylistsComponent } from './barra-busqueda/search-results-playlists/search-results-playlists.component';
import { sessionGuard } from './guards/session.guard';
import { nicknameGuard } from './guards/nickname.guard';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';

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
        path: 'home/search/artists/:keyword',
        component: SearchResultsArtistsComponent
      },
      {
        path: 'home/search/playlists/:keyword',
        component: SearchResultsPlaylistsComponent
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
        component: ProfileComponent,
        children: [
          {
            path: '',
            redirectTo: 'songs',
            pathMatch: 'full'
          },
          {
            path: 'songs',
            component: ProfileSongsComponent
          },
          {
            path: 'playlists',
            component: ProfilePlaylistsComponent
          },
          {
            path: 'playlists/:playlistId',
            component: ProfilePlaylistComponent
          }
        ]
      }
    ]
  },
  {
    path: 'register',
    component: RegistroComponent,
    canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'upload',
    component: UploadSongComponent,
    canActivate: [sessionGuard]
  },
  {
    path: 'my-profile/:nickname',
    component: MyProfileComponent,
    canActivate: [sessionGuard, nicknameGuard],
    children: [
      {
        path: '',
        redirectTo: 'songs',
        pathMatch: 'full'
      },
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
        component: MyPlaylistComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
