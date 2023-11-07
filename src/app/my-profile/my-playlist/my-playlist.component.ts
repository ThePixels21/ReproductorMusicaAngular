import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyPlaylistsService } from '../my-playlists.service';
import { IPlaylist } from 'src/app/models/IPlaylist';
import { SongService } from 'src/app/inicio/song.service';
import { ISong } from 'src/app/models/ISong';
import { ISelectableSong } from 'src/app/models/ISelectableSong';
import { SwalUtils } from 'src/app/utils/swal-utils';
import Swal from 'sweetalert2';
import { Functions } from 'src/app/utils/utils-functions';

@Component({
  selector: 'app-my-playlist',
  templateUrl: './my-playlist.component.html',
  styleUrls: ['./my-playlist.component.css']
})
export class MyPlaylistComponent {

  icLinesSuccess = '../../assets/icon/more_horizontal_lines.svg';
  icLinesWhite = '../../assets/icon/more_horizontal_lines_white.svg';
  icPause = '../../assets/icon/pause.svg';
  icPlay = '../../assets/icon/play.svg';
  icAdd = '../../assets/icon/add.svg';

  loading = true
  loadingModal = true

  playing = false
  paused = true

  id!: string
  name!: string
  playlist!: IPlaylist
  public!: boolean

  songs: ISong[] = []
  currentPlaylist!: ISong[]
  currentSongId: string = ""

  allSongs!: ISelectableSong[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private playlistService: MyPlaylistsService,
    private songService: SongService
  ) {
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
    this.activatedRoute.params.subscribe(params => {
      this.id = params['playlistId']
      this.loadItems()
    })
  }

  loadItems() {
    this.playlistService.loadPlaylists()
    this.playlistService.getPlaylistById(this.id)
      .then(doc => {
        this.playlist = doc.data() as IPlaylist
        this.name = this.playlist.name
        this.public = this.playlist.public
        this.playlistService.getSongsFromPlaylist(this.playlist)
          .then(songs => {
            this.songs = songs as ISong[]
            this.loading = false
            console.log(this.songs)
            if (!this.paused && JSON.stringify(Functions.getSongIds(this.currentPlaylist)) === JSON.stringify(Functions.getSongIds(this.songs))) {
              this.playing = true
            } else {
              this.playing = false
            }
            this.songService.getMusicList().subscribe(songs => {
              this.allSongs = songs.map(song => ({ ...song, selected: this.playlist.songsIds.includes(song.id!!) }))
              this.loadingModal = false
            })
          })
          .catch(err => console.log(err))
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

  addSong() {
    SwalUtils.loadingMessage('Adding songs...')
    const selectedSongIds: string[] = this.allSongs.filter(song => song.selected).map(song => song.id) as string[]
    this.playlistService.updatePlaylistSongs(this.id, selectedSongIds)
      .then(res => {
        Swal.close()
        SwalUtils.customMessageOk('Added', 'Songs added succesfully')
        this.loading = true
        this.loadItems()
      })
      .catch(err => console.log(err))
  }

  removeSong(songId: string) {
    SwalUtils.loadingMessage('Removing song...')
    this.songs = this.songs.filter(song => song.id !== songId)
    const selectedSongIds: string[] = this.songs.map(song => song.id) as string[]
    this.playlistService.updatePlaylistSongs(this.id, selectedSongIds)
      .then(res => {
        Swal.close()
        SwalUtils.customMessageOk('Added', 'Songs added succesfully')
        this.loading = true
        this.loadItems()
      })
      .catch(err => console.log(err))
  }

  updateStatus() {
    if (this.public) {
      SwalUtils.loadingMessage('Updating playlist status to public...')
    } else {
      SwalUtils.loadingMessage('Updating playlist status to private...')
    }
    this.playlistService.updatePlaylistStatus(this.id, this.public)
      .then(res => {
        Swal.close()
        SwalUtils.customMessageOk('Updated', 'Status updated succesfully')
      })
      .catch(err => console.log(err))
  }

}
