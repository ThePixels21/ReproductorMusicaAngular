import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { ArtistsComponent } from './artists/artists.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: InicioComponent
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
    path: 'playlists',
    component: PlaylistsComponent
  },
  {
    path: 'artists',
    component: ArtistsComponent
  },
  {
    path: 'profile',
    children: [
      {
        path: '', redirectTo: `/profile/my-profile/nickname/${sessionStorage.getItem('nickname')}`, pathMatch: 'full'
      },
      {
        path: 'my-profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
