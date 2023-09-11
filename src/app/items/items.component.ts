import { Component } from '@angular/core';

import { IMusic } from './IMusic';

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

  musicList: IMusic[] = [
    {
      id: 1,
      tittle: 'Wait For Us To Collide',
      artist: 'Mindme',
      url: "../../assets/music/Wait_For_Us_To_Collide.mp3"
    },
    {
      id: 2,
      tittle: 'Te Xtraño',
      artist: 'Bambi Haze',
      url: "../../assets/music/Te_Xtrano.mp3"
    },
    {
      id: 3,
      tittle: 'No Hay Trabajo',
      artist: 'Lawd Ito',
      url: "../../assets/music/No_Hay_Trabajo.mp3"
    },
    {
      id: 4,
      tittle: 'Happy Day',
      artist: 'Top-Flow-Production',
      url: "../../assets/music/Happy_Day.mp3"
    },
    {
      id: 5,
      tittle: 'Shake It',
      artist: 'Aakash Gandhi',
      url: "../../assets/music/Shake_It.mp3"
    },
    {
      id: 6,
      tittle: 'Amor Chiquito',
      artist: 'Quincas Moreira',
      url: "../../assets/music/Amor_Chiquito.mp3"
    },
    {
      id: 7,
      tittle: 'Salgre',
      artist: 'Jimmy Fontanez',
      url: "../../assets/music/Salgre.mp3"
    },
    {
      id: 8,
      tittle: 'Cuban Sandwich',
      artist: 'Doug Maxwell',
      url: "../../assets/music/Cuban_Sandwich.mp3"
    },
    {
      id: 9,
      tittle: 'Bengo Latino',
      artist: 'Jimmy Fontanez',
      url: "../../assets/music/Bengo_Latino.mp3"
    },
    {
      id: 10,
      tittle: 'Hot Salsa',
      artist: 'Audionautix',
      url: "../../assets/music/Hot_Salsa.mp3"
    },
    {
      id: 11,
      tittle: 'Sneaky Bass Latina',
      artist: 'Jimmy Fontanez',
      url: "../../assets/music/Sneaky_Bass_Latina.mp3"
    },
    {
      id: 12,
      tittle: 'Malandragem',
      artist: 'Quincas Moreira',
      url: "../../assets/music/Malandragem.mp3"
    },
    {
      id: 13,
      tittle: 'Los Angeles',
      artist: 'Jimmy Fontanez',
      url: "../../assets/music/Los_Angeles.mp3"
    },
    {
      id: 14,
      tittle: 'Immortal',
      artist: 'NEFFEX',
      url: "../../assets/music/Immortal.mp3"
    },
    {
      id: 15,
      tittle: 'No Filter',
      artist: 'NEFFEX',
      url: "../../assets/music/No_Filter.mp3"
    },
    {
      id: 16,
      tittle: 'Here It Comes',
      artist: 'TrackTribe',
      url: "../../assets/music/Here_It_Comes.mp3"
    },
    {
      id: 17,
      tittle: 'Blue Day',
      artist: 'Freedom Trail Studio',
      url: "../../assets/music/Blue_Day.mp3"
    }
  ];

  currentSong: IMusic = {
    tittle: 'No song',
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
