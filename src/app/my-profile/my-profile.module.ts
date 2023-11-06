import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { MySongsComponent } from './my-songs/my-songs.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { MyPlaylistComponent } from './my-playlist/my-playlist.component';
import { PanelControlModule } from '../panel-control/panel-control.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyProfileComponent,
    MySongsComponent,
    MyPlaylistsComponent,
    MyPlaylistComponent
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
