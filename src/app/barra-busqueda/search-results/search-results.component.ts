import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';
import { ISong } from 'src/app/models/ISong';
import { SongService } from 'src/app/inicio/song.service';
import { IPlaylist } from 'src/app/models/IPlaylist';
import { MyPlaylistsService } from 'src/app/my-profile/my-playlists.service';
import { SwalUtils } from 'src/app/utils/swal-utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  icLinesSuccess = '../../assets/icon/more_horizontal_lines.svg';
  icLinesWhite = '../../assets/icon/more_horizontal_lines_white.svg';

  keyword = ""
  currentSongId: string = ""
  songs !: ISong[]
  currentPlaylist!: ISong[]

  myPlaylists: IPlaylist[] = []

  constructor(
    private searchService: SearchService,
    private songService: SongService,
    private playlistService: MyPlaylistsService,
    private activatedRoute: ActivatedRoute
  ){

    this.playlistService.getMyPlaylists().subscribe(playlists => {
      this.myPlaylists = playlists
    })

    this.songService.getCurrentSongId().subscribe(index => {
      this.currentSongId = index
    })

    this.songService.getCurrentPlaylist().subscribe(songs => {
      this.currentPlaylist = songs
    })
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.keyword = params['keyword']
      this.searchSongs()
    })
  }

  searchSongs(){
    this.searchService.searchSongs(this.keyword)
    .then(snap => {
      this.songs = snap.docs.map(doc => doc.data() as ISong)
      console.log(this.songs)
    })
    .catch(err => console.log(err))
  }

  play(song: ISong){
    let index: number = this.currentPlaylist.findIndex(s => s.id == song.id)
    this.songService.setCurrentSongIndex(index)
    this.songService.setCurrentSongId(song.id!!)
    this.songService.setCurrentSong(song)
    this.songService.setAudioUrlAndPlay(song.url)
  }

  addToPlaylist(songId: string, playlist: IPlaylist){
    if(!playlist.songsIds.includes(songId)){
      SwalUtils.loadingMessage('Adding song...')
      playlist.songsIds.push(songId)
      this.playlistService.updatePlaylistSongs(playlist.id, playlist.songsIds)
      .then(res => {
        Swal.close()
        SwalUtils.customMessageOk('Added', 'Song added succesfully')
        this.playlistService.loadPlaylists()
      })
      .catch(err => console.log(err))
    }else {
      SwalUtils.customMessageError('Error', 'Song is already added')
    }
  }

}
