import { Component } from '@angular/core';
import { IPlaylist } from 'src/app/models/IPlaylist';
import { ISong } from 'src/app/models/ISong';
import { ArtistsService } from '../artists.service';
import { ActivatedRoute } from '@angular/router';
import { SongService } from 'src/app/inicio/song.service';
import { MyPlaylistsService } from 'src/app/my-profile/my-playlists.service';
import { SwalUtils } from 'src/app/utils/swal-utils';
import Swal from 'sweetalert2';
import { Functions } from 'src/app/utils/utils-functions';

@Component({
  selector: 'app-profile-songs',
  templateUrl: './profile-songs.component.html',
  styleUrls: ['./profile-songs.component.css']
})
export class ProfileSongsComponent {

  icLinesSuccess = '../../assets/icon/more_horizontal_lines.svg';
  icLinesWhite = '../../assets/icon/more_horizontal_lines_white.svg';
  icPause = '../../assets/icon/pause.svg';
  icPlay = '../../assets/icon/play.svg';

  loading = true

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
  ) {

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
        if (!this.playing && JSON.stringify(Functions.getSongIds(this.currentPlaylist)) === JSON.stringify(Functions.getSongIds(this.songs))) {
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
        this.loading = false
        console.log(this.songs)
        if (JSON.stringify(Functions.getSongIds(this.currentPlaylist)) != JSON.stringify(Functions.getSongIds(this.songs))) {
          this.playing = false
        } else {
          if (!this.paused) {
            this.playing = true
          }
        }
      })
      .catch(err => console.log(err))
  }

  play(index: number) {
    if (!this.playing && JSON.stringify(Functions.getSongIds(this.currentPlaylist)) != JSON.stringify(Functions.getSongIds(this.songs))) {
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

  addToPlaylist(songId: string, playlist: IPlaylist) {
    if (!playlist.songsIds.includes(songId)) {
      SwalUtils.loadingMessage('Adding song...')
      playlist.songsIds.push(songId)
      this.playlistService.updatePlaylistSongs(playlist.id, playlist.songsIds)
        .then(res => {
          Swal.close()
          SwalUtils.customMessageOk('Added', 'Song added succesfully')
          this.playlistService.loadPlaylists()
        })
        .catch(err => console.log(err))
    } else {
      SwalUtils.customMessageError('Error', 'Song is already added')
    }
  }

}
