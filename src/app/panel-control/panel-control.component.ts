import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IMusic } from '../items/IMusic';

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

  @Input() pausado: boolean = true;
  @Output() pausadoChange = new EventEmitter<boolean>();

  @Input() currentSongIndex: any = undefined;
  @Output() currentSongIndexChange = new EventEmitter<any>();

  @Input() audio = new Audio();
  @Output() audioChange = new EventEmitter<any>();

  @Input() currentSong: IMusic = {
    tittle: '',
    artist: '',
    url: ''
  };
  @Output() currentSongChange = new EventEmitter<IMusic>();

  @Input() musicList: IMusic[] = [];

  play(): void {
    if (this.audio.paused) {
      if (this.audio.readyState === 0) {
        this.currentSongIndex = 0;
        this.currentSong = this.musicList[0];
        this.audio.src = this.currentSong.url
        this.currentSongIndexChange.emit(this.currentSongIndex)
        this.currentSongChange.emit(this.currentSong)
      }
      this.audio.play()
      this.pausado = false
    } else {
      this.audio.pause()
      this.pausado = true
    }
    this.pausadoChange.emit(this.pausado)
    this.audioChange.emit(this.audio)
  }

  adjustVolume() {
    this.audio.volume = this.volumeSlider / 16;
    this.audioChange.emit(this.audio)
  }

  next() {
    if (this.currentSongIndex != this.musicList.length - 1) {
      this.currentSongIndex++;
      this.currentSong = this.musicList[this.currentSongIndex]
      this.audio.src = this.currentSong.url
      this.audio.play()
      this.pausado = false
    } else {
      this.currentSongIndex = 0
      this.currentSong = this.musicList[this.currentSongIndex]
      this.audio.src = this.currentSong.url
      this.audio.play()
      this.pausado = false
    }
    this.currentSongIndexChange.emit(this.currentSongIndex)
    this.currentSongChange.emit(this.currentSong)
    this.pausadoChange.emit(this.pausado)
    this.audioChange.emit(this.audio)
  }

  previous() {
    if (this.currentSongIndex != 0) {
      this.currentSongIndex--;
      this.currentSong = this.musicList[this.currentSongIndex]
      this.audio.src = this.currentSong.url
      this.audio.play()
      this.pausado = false
    } else {
      this.currentSongIndex = this.musicList.length - 1
      this.currentSong = this.musicList[this.currentSongIndex]
      this.audio.src = this.currentSong.url
      this.audio.play()
      this.pausado = false
    }
    this.currentSongIndexChange.emit(this.currentSongIndex)
    this.currentSongChange.emit(this.currentSong)
    this.pausadoChange.emit(this.pausado)
    this.audioChange.emit(this.audio)
  }

}
