import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlaylist } from 'src/app/models/IPlaylist';
import { ArtistsService } from '../artists.service';

@Component({
  selector: 'app-profile-playlists',
  templateUrl: './profile-playlists.component.html',
  styleUrls: ['./profile-playlists.component.css']
})
export class ProfilePlaylistsComponent {

  nickname!: string
  playlists!: IPlaylist[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private artistService: ArtistsService
    ){}

  ngOnInit(){
    this.activatedRoute.parent!!.params.subscribe(params => {
      this.nickname = params['nickname']
      this.loadPlaylists()
    })
  }

  loadPlaylists(){
    this.artistService.getPublicPlaylistsByNickname(this.nickname)
    .then(snap => {
      this.playlists = snap.docs.map(doc => doc.data() as IPlaylist)
      console.log(this.playlists)
    })
    .catch(err => console.log(err))
  }

}
