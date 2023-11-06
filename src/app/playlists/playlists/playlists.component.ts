import { Component } from '@angular/core';
import { IPlaylist } from 'src/app/models/IPlaylist';
import { PlaylistsService } from '../playlists.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent {

  loading =  true
  playlists: IPlaylist[] = []

  constructor(private playlistService: PlaylistsService){}

  ngOnInit(){
    this.playlistService.getPublicPlaylists()
    .then(snap => {
      this.playlists = snap.docs.map(doc => doc.data() as IPlaylist)
      this.loading = false
      console.log(this.playlists)
    })
    .catch(err => console.log(err))
  }

}
