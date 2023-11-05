import { Component, OnInit } from '@angular/core';

import { ISong } from '../models/ISong';
import * as moment from 'moment';
import { SongService } from '../inicio/song.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {

  loading = true

  icLinesSuccess = '../../assets/icon/more_horizontal_lines.svg';
  icLinesWhite = '../../assets/icon/more_horizontal_lines_white.svg';
  icPause = '../../assets/icon/pause.svg';
  icPlay = '../../assets/icon/play.svg';

  audio = new Audio();
  currentSongIndex: any = undefined;
  currentSongId: string = ""
  currentSong: any

  pausado: boolean = true
  playing = false

  musicLength: string = '0:00';
  duration: number = 1;
  currentTime: string = '0:00';
  musicList: ISong[] = []
  currentPlaylist: ISong[] = []

  constructor(private songs: SongService) {

    this.songs.getAudio().subscribe(audio => {
      this.audio = audio
    })

    this.songs.getCurrentSong().subscribe(current => {
      this.currentSong = current
    })

    this.songs.getCurrentPlaylist().subscribe(songs => {
      this.currentPlaylist = songs
    })

    this.songs.getCurrentSongId().subscribe(index => {
      this.currentSongId = index
    })

    this.songs.getCurrentSongIndex().subscribe(index => {
      this.currentSongIndex = index
    })

    this.songs.getCurrentSongLength().subscribe(lenght => {
      this.musicLength = lenght
    })

    this.songs.getCurrentSongDuration().subscribe(duration => {
      this.duration = duration
    })

    this.songs.getCurrentTime().subscribe(currentTime => {
      this.currentTime = currentTime
    })

    this.songs.isPaused().subscribe(paused => {
      this.pausado = paused
      if (this.pausado == true) {
        this.playing = false
      } else {
        if (this.currentPlaylist == this.musicList) {
          this.playing = true
        }
      }
    })

    this.songs.getMusicList().subscribe(songs => {
      this.musicList = songs
      console.log("Entró-------------------")
      if(this.musicList.length > 0){
        this.loading = false
      }
    })
  }

  ngOnInit(){
    if (this.currentPlaylist != this.musicList) {
      this.playing = false
    } else {
      if(!this.pausado){
        this.playing = true
      }
    }
  }

  play(index: number): void {
    if(this.currentPlaylist != this.musicList){
      this.songs.setCurrentPlaylist(this.musicList)
      this.playing = true
    }
    this.songs.setCurrentSongIndex(index)
    this.songs.setCurrentSongId(this.musicList[index].id!!)
    this.songs.setCurrentSong(this.musicList[index])
    this.songs.setAudioUrlAndPlay(this.currentSong.url)
  }

  pause() {
    this.songs.pauseAudio()
    this.songs.setPaused(true)
  }

}
