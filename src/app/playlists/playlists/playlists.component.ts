import { Component } from '@angular/core';
import { IPlaylist } from 'src/app/models/IPlaylist';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent {

  playlists: IPlaylist[] = []

}
