import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { ArtistsComponent } from './artists/artists/artists.component';
import { ItemsComponent } from './items/items.component';
import { UploadSongComponent } from './upload-song/upload-song.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProfileComponent } from './artists/profile/profile.component';

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
    component: MyProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
