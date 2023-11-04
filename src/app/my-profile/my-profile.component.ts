import { Component } from '@angular/core';
import { ISong } from '../models/ISong';
import { ArtistsService } from '../artists/artists.service';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../inicio/song.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  icLinesSuccess = '../../assets/icon/more_horizontal_lines.svg';
  icLinesWhite = '../../assets/icon/more_horizontal_lines_white.svg';
  icPause = '../../assets/icon/pause.svg';
  icPlay = '../../assets/icon/play.svg';

  playing = false

  paused = true

  nickname: string = ""
  songs!: ISong[]
  currentPlaylist!: ISong[]
  currentSongId: string = ""

  constructor(
    private artistsService: ArtistsService,
    private activatedRoute: ActivatedRoute,
    private songService: SongService
  ){
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
    this.activatedRoute.params.subscribe(params => {
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

}
