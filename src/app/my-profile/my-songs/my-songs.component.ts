import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistsService } from 'src/app/artists/artists.service';
import { SongService } from 'src/app/inicio/song.service';
import { ISong } from 'src/app/models/ISong';
import { MyPlaylistsService } from '../my-playlists.service';
import { IPlaylist } from 'src/app/models/IPlaylist';
import { SwalUtils } from 'src/app/utils/swal-utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-songs',
  templateUrl: './my-songs.component.html',
  styleUrls: ['./my-songs.component.css']
})
export class MySongsComponent {

  
  icLinesSuccess = '../../assets/icon/more_horizontal_lines.svg';
  icLinesWhite = '../../assets/icon/more_horizontal_lines_white.svg';
  icPause = '../../assets/icon/pause.svg';
  icPlay = '../../assets/icon/play.svg';

  playing = false

  paused = true

  nickname: string = ""
  songs: ISong[] = []
  currentPlaylist!: ISong[]
  currentSongId: string = ""

  myPlaylists: IPlaylist[] = []

  constructor(
    private artistsService: ArtistsService,
    private activatedRoute: ActivatedRoute,
    private songService: SongService,
    private playlistService: MyPlaylistsService
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

    this.songService.isPaused().subscribe(paused => {
      this.paused = paused
      if (this.paused == true) {
        this.playing = false
      } else {
        if (this.currentPlaylist.join() == this.songs.join()) {
          this.playing = true
        }
      }
    })
  }

  ngOnInit() {
    this.activatedRoute.parent!!.params.subscribe(params => {
      this.nickname = params['nickname']
      this.loadItems()
    })
  }

  loadItems() {
    this.artistsService.getSongsByNickname(this.nickname)
      .then(snap => {
        this.songs = snap.docs.map(doc => doc.data() as ISong)
        console.log(this.songs)
        if (this.currentPlaylist.join() != this.songs.join()) {
          this.playing = false
        } else {
          if(!this.paused){
            this.playing = true
          }
        }
      })
      .catch(err => console.log(err))
  }

  play(index: number) {
    if (this.currentPlaylist.join() != this.songs.join()) {
      this.songService.setCurrentPlaylist(this.songs)
      this.playing = true
    }
    this.songService.setCurrentSongIndex(index)
    this.songService.setCurrentSongId(this.songs[index].id!!)
    this.songService.setCurrentSong(this.songs[index])
    this.songService.setAudioUrlAndPlay(this.songs[index].url)
  }

  pause() {
    this.songService.pauseAudio()
    this.songService.setPaused(true)
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

  async deleteSong(song: ISong) {
    SwalUtils.loadingMessage('Deleting song...')
    try {
      await this.songService.deleteSongFromStorage(song.url);
      await this.songService.deleteSongFromFirestore(song.id!!);
      Swal.close()
      SwalUtils.customMessageOk('Deleted', 'Song deleted succesfully')
      this.songService.updateMusicList()
      this.loadItems()
    } catch (err) {
      console.error(err);
      SwalUtils.customMessageError('Error deleting song', 'Contact support')
    }
  }

}
