import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMusic } from '../models/IMusic';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor() { }

  private songs: IMusic[] = [
    {
      id: 1,
      title: 'Wait For Us To Collide',
      artist: 'Mindme',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FWait_For_Us_To_Collide.mp3?alt=media&token=26743490-bd32-4a86-aa61-f6f8b4e35470"
    },
    {
      id: 2,
      title: 'Te Xtraño',
      artist: 'Bambi Haze',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FTe_Xtrano.mp3?alt=media&token=9f0c82a4-90f2-4e99-bc7d-f8e30cfeb5e4"
    },
    {
      id: 3,
      title: 'No Hay Trabajo',
      artist: 'Lawd Ito',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FNo_Hay_Trabajo.mp3?alt=media&token=1baa1270-41fc-4635-9023-a983c11d79d3"
    },
    {
      id: 4,
      title: 'Happy Day',
      artist: 'Top-Flow-Production',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FHappy_Day.mp3?alt=media&token=eed1410c-5cd0-49b6-84ff-d50f588b58cd"
    },
    {
      id: 5,
      title: 'Shake It',
      artist: 'Aakash Gandhi',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FShake_It.mp3?alt=media&token=dd13c3da-b412-484f-a6d7-c00ca86446fb"
    },
    {
      id: 6,
      title: 'Amor Chiquito',
      artist: 'Quincas Moreira',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FAmor_Chiquito.mp3?alt=media&token=b0c7d652-dabf-4e54-8f11-9f1dde196908"
    },
    {
      id: 7,
      title: 'Salgre',
      artist: 'Jimmy Fontanez',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FSalgre.mp3?alt=media&token=89c18569-d303-40d9-8004-4ea604300b95"
    },
    {
      id: 8,
      title: 'Cuban Sandwich',
      artist: 'Doug Maxwell',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FCuban_Sandwich.mp3?alt=media&token=c88aa97c-e51a-430b-8f39-b010fa5da7cf"
    },
    {
      id: 9,
      title: 'Bengo Latino',
      artist: 'Jimmy Fontanez',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FBengo_Latino.mp3?alt=media&token=031d2fb4-ecd2-4b6d-adb1-d91ce81f9fac"
    },
    {
      id: 10,
      title: 'Hot Salsa',
      artist: 'Audionautix',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FHot_Salsa.mp3?alt=media&token=6d26ccd0-9245-4eaa-928b-f25c2cfb8d2c"
    },
    {
      id: 11,
      title: 'Sneaky Bass Latina',
      artist: 'Jimmy Fontanez',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FSneaky_Bass_Latina.mp3?alt=media&token=fdaf6a15-b5d4-460f-808c-4fb46ae57f00"
    },
    {
      id: 12,
      title: 'Malandragem',
      artist: 'Quincas Moreira',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FMalandragem.mp3?alt=media&token=4e3f3f02-b138-4191-87df-4f723d136705"
    },
    {
      id: 13,
      title: 'Los Angeles',
      artist: 'Jimmy Fontanez',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FLos_Angeles.mp3?alt=media&token=ad56b5bb-3d79-46c5-8292-6f12afaeac4b"
    },
    {
      id: 14,
      title: 'Immortal',
      artist: 'NEFFEX',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FImmortal.mp3?alt=media&token=f2844b22-da39-483a-a42f-eb86e2734e71"
    },
    {
      id: 15,
      title: 'No Filter',
      artist: 'NEFFEX',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FNo_Filter.mp3?alt=media&token=ffb9fd7e-3835-4c23-862c-e888e8f88711"
    },
    {
      id: 16,
      title: 'Here It Comes',
      artist: 'TrackTribe',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FHere_It_Comes.mp3?alt=media&token=80af4006-6526-4e59-8117-8c438d4c1ef7"
    },
    {
      id: 17,
      title: 'Blue Day',
      artist: 'Freedom Trail Studio',
      url: "https://firebasestorage.googleapis.com/v0/b/music-angular-523c8.appspot.com/o/Music%2FBlue_Day.mp3?alt=media&token=37a47899-830c-4d4c-8618-74990e6c414b"
    }
  ];

  private current: IMusic = {
    title: 'No song',
    artist: '',
    url: ''
  }

  private audio = new BehaviorSubject(new Audio())
  private currentSong = new BehaviorSubject(this.current)
  private currentSongIndex = new BehaviorSubject(undefined)
  private currentSongLength = new BehaviorSubject('0:00')
  private currentSongDuration = new BehaviorSubject(1)
  private currentTime = new BehaviorSubject('0:00')
  private paused = new  BehaviorSubject(true)
  private musicList = new BehaviorSubject(this.songs)
  
  getAudio(){
    return this.audio.asObservable()
  }

  getCurrentSong(){
    return this.currentSong.asObservable()
  }

  getCurrentSongIndex(){
    return this.currentSongIndex.asObservable()
  }

  getCurrentSongLength(){
    return this.currentSongLength.asObservable()
  }
  
  getCurrentSongDuration(){
    return this.currentSongDuration.asObservable()
  }

  getCurrentTime(){
    return this.currentTime.asObservable()
  }

  isPaused(){
    return this.paused.asObservable()
  }

  getMusicList(){
    return this.musicList.asObservable()
  }


  setAudio(audio: any) {
    this.audio.next(audio);
  }

  setAudioVolume(volume: number){
    this.audio.value.volume = volume
  }

  setAudioUrl(url: string) {
    this.audio.value.src = url
  }

  setAudioUrlAndPlay(url: string) {
    this.audio.value.src = url
    this.audio.value.play()
    this.setPaused(false)
  }

  playAudio(){
    this.audio.value.play()
  }

  pauseAudio(){
    this.audio.value.pause()
  }
  
  setCurrentSong(song: any) {
    this.currentSong.next(song);
  }

  setCurrentSongIndex(index: any) {
    this.currentSongIndex.next(index);
  }

  setCurrentSongLength(length: string) {
    this.currentSongLength.next(length);
  }

  setCurrentSongDuration(duration: number) {
    this.currentSongDuration.next(duration);
  }

  setCurrentTime(time: string) {
    this.currentTime.next(time);
  }

  setPaused(paused: boolean) {
    this.paused.next(paused);
  }

  setMusicList(list: []) {
    this.musicList.next(list);
  }

}
