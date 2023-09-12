import { Component } from '@angular/core';

import { IMusic } from './IMusic';
import * as moment from 'moment';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {

  icLinesSuccess = '../../assets/icon/more_horizontal_lines.svg';
  icLinesWhite = '../../assets/icon/more_horizontal_lines_white.svg';

  audio = new Audio();
  currentSongIndex: any = undefined;

  pausado: boolean = true

  musicLength: string = '0:00';
  duration: number = 1;
  currentTime: string = '0:00';

  constructor() {
    this.audio.ondurationchange = () => {
      const totalSeconds = Math.floor(this.audio.duration), duration = moment.duration(totalSeconds, 'seconds');
      this.musicLength = duration.seconds() < 10 ? `${Math.floor(duration.asMinutes())}:0${duration.seconds()}` :
        `${Math.floor(duration.asMinutes())}:${duration.seconds()}`;
      this.duration = totalSeconds;
    }

    this.audio.ontimeupdate = () => {
      const duration = moment.duration(Math.floor(this.audio.currentTime), 'seconds');
      let secs = duration.seconds(), mins = duration.asMinutes()
      this.currentTime = secs < 10 ? `${Math.floor(mins)}:0${secs}` :
        `${Math.floor(mins)}:${secs}`;
    }
  }

  musicList: IMusic[] = [
    {
      id: 1,
      title: 'Wait For Us To Collide',
      artist: 'Mindme',
      url: "../../assets/music/Wait_For_Us_To_Collide.mp3"
    },
    {
      id: 2,
      title: 'Te Xtraño',
      artist: 'Bambi Haze',
      url: "../../assets/music/Te_Xtrano.mp3"
    },
    {
      id: 3,
      title: 'No Hay Trabajo',
      artist: 'Lawd Ito',
      url: "../../assets/music/No_Hay_Trabajo.mp3"
    },
    {
      id: 4,
      title: 'Happy Day',
      artist: 'Top-Flow-Production',
      url: "../../assets/music/Happy_Day.mp3"
    },
    {
      id: 5,
      title: 'Shake It',
      artist: 'Aakash Gandhi',
      url: "../../assets/music/Shake_It.mp3"
    },
    {
      id: 6,
      title: 'Amor Chiquito',
      artist: 'Quincas Moreira',
      url: "../../assets/music/Amor_Chiquito.mp3"
    },
    {
      id: 7,
      title: 'Salgre',
      artist: 'Jimmy Fontanez',
      url: "../../assets/music/Salgre.mp3"
    },
    {
      id: 8,
      title: 'Cuban Sandwich',
      artist: 'Doug Maxwell',
      url: "../../assets/music/Cuban_Sandwich.mp3"
    },
    {
      id: 9,
      title: 'Bengo Latino',
      artist: 'Jimmy Fontanez',
      url: "../../assets/music/Bengo_Latino.mp3"
    },
    {
      id: 10,
      title: 'Hot Salsa',
      artist: 'Audionautix',
      url: "../../assets/music/Hot_Salsa.mp3"
    },
    {
      id: 11,
      title: 'Sneaky Bass Latina',
      artist: 'Jimmy Fontanez',
      url: "../../assets/music/Sneaky_Bass_Latina.mp3"
    },
    {
      id: 12,
      title: 'Malandragem',
      artist: 'Quincas Moreira',
      url: "../../assets/music/Malandragem.mp3"
    },
    {
      id: 13,
      title: 'Los Angeles',
      artist: 'Jimmy Fontanez',
      url: "../../assets/music/Los_Angeles.mp3"
    },
    {
      id: 14,
      title: 'Immortal',
      artist: 'NEFFEX',
      url: "../../assets/music/Immortal.mp3"
    },
    {
      id: 15,
      title: 'No Filter',
      artist: 'NEFFEX',
      url: "../../assets/music/No_Filter.mp3"
    },
    {
      id: 16,
      title: 'Here It Comes',
      artist: 'TrackTribe',
      url: "../../assets/music/Here_It_Comes.mp3"
    },
    {
      id: 17,
      title: 'Blue Day',
      artist: 'Freedom Trail Studio',
      url: "../../assets/music/Blue_Day.mp3"
    }
  ];

  currentSong: IMusic = {
    title: 'No song',
    artist: '',
    url: ''
  }

  play(index: number): void {
    this.currentSongIndex = index
    this.currentSong = this.musicList[index];
    this.audio.src = this.currentSong.url;
    this.pausado = false
    this.audio.play();
  }

}
