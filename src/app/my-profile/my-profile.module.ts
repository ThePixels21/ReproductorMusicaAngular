import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MySongsComponent } from './my-songs/my-songs.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { MyProfileComponent } from './my-profile.component';
import { PanelControlModule } from '../panel-control/panel-control.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaylistComponent } from './playlist/playlist.component';


@NgModule({
  declarations: [
    MyProfileComponent,
    MySongsComponent,
    MyPlaylistsComponent,
    PlaylistComponent
  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    PanelControlModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MyProfileComponent,
    MySongsComponent,
    MyPlaylistsComponent
  ]
})
export class MyProfileModule { }