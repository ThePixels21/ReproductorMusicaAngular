import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IMusic } from '../models/IMusic';
import { SongService } from '../inicio/song.service';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.css']
})
export class PanelControlComponent {

  icNext = '../../assets/icon/next.svg';
  icBack = '../../assets/icon/back.svg';
  icPause = '../../assets/icon/pause.svg';
  icPlay = '../../assets/icon/play.svg';
  icVolumeMax = '../../assets/icon/volume-max.svg';
  icVolumeMin = '../../assets/icon/volume-min.svg';
  icVolumeX = '../../assets/icon/volume-xmark.svg';

  volumeSlider = 9;

  musicLength: string = '0:00';
  duration: number = 1;
  currentTime: string = '0:00';

  pausado: boolean = true;

  currentSongIndex: any = undefined;

  audio = new Audio();

  currentSong: IMusic = {
    title: '',
    artist: '',
    url: ''
  };

  musicList: IMusic[] = [];

  constructor(private songs: SongService){

    this.songs.getAudio().subscribe(audio => {
      this.audio = audio
    })

    this.songs.getCurrentSong().subscribe(current => {
      this.currentSong = current
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
      if(this.audio.readyState != 0 && this.currentTime == this.musicLength){
        console.log(`Siguiente--------------------------`)
        this.next()
      }
    })

    this.songs.isPaused().subscribe(paused => {
      this.pausado = paused
    })

    this.songs.getMusicList().subscribe(songs => {
      this.musicList = songs
    })

  }

  play(): void {
    if (this.audio.paused) {
      if (this.audio.readyState === 0) {
        this.songs.setCurrentSongIndex(0)
        this.songs.setCurrentSong(this.musicList[0])
        this.songs.setAudioUrl(this.currentSong.url)
      }
      this.songs.playAudio()
      this.songs.setPaused(false)
    } else {
      this.songs.pauseAudio()
      this.songs.setPaused(true)
    }
  }

  adjustVolume() {
    this.songs.setAudioVolume(this.volumeSlider / 16)
  }

  next() {
    if (this.currentSongIndex != this.musicList.length - 1) {
      this.songs.setCurrentSongIndex(this.currentSongIndex + 1)
      this.songs.setCurrentSong(this.musicList[this.currentSongIndex])
      this.songs.setAudioUrlAndPlay(this.currentSong.url)
    } else {
      this.songs.setCurrentSongIndex(0)
      this.songs.setCurrentSong(this.musicList[this.currentSongIndex])
      this.songs.setAudioUrlAndPlay(this.currentSong.url)
    }
  }

  previous() {
    if (this.currentSongIndex != 0) {
      this.songs.setCurrentSongIndex(this.currentSongIndex - 1)
      this.songs.setCurrentSong(this.musicList[this.currentSongIndex])
      this.songs.setAudioUrlAndPlay(this.currentSong.url)
    } else {
      this.songs.setCurrentSongIndex(this.musicList.length - 1)
      this.currentSong = this.musicList[this.currentSongIndex]
      this.songs.setCurrentSong(this.musicList[this.currentSongIndex])
      this.songs.setAudioUrlAndPlay(this.currentSong.url)
    }
  }

}
