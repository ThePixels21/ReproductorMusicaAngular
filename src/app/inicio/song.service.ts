import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISong } from '../models/ISong';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private songs: ISong[] = []

  private currentSongs: ISong[] = []

  private current: ISong = {
    title: 'No song',
    artist: '',
    url: ''
  }

  private audio = new BehaviorSubject(new Audio())
  private currentSong = new BehaviorSubject(this.current)
  private currentSongId = new BehaviorSubject("")
  private currentSongIndex = new BehaviorSubject(undefined)
  private currentSongLength = new BehaviorSubject('0:00')
  private currentSongDuration = new BehaviorSubject(1)
  private currentTime = new BehaviorSubject('0:00')
  private paused = new BehaviorSubject(true)
  private musicList = new BehaviorSubject(this.songs)
  private currentPlaylist = new BehaviorSubject(this.currentSongs)

  constructor(private firestore: Firestore) {
    if (this.songs.length == 0) {
      this.getAllSongs()
      .then(snap => {
          const songs: ISong[] = snap.docs.map(doc => doc.data() as ISong)
          this.songs = songs
          this.setMusicList(this.songs)
          this.currentSongs = this.songs
          this.setCurrentPlaylist(this.currentSongs)
        })
        .catch(err => console.log(err))
    }
  }

  getAllSongs() {
    const songCollection = collection(this.firestore, 'songs')
    return getDocs(songCollection)
  }

  getAudio() {
    return this.audio.asObservable()
  }

  getCurrentPlaylist() {
    return this.currentPlaylist.asObservable()
  }

  getCurrentSong() {
    return this.currentSong.asObservable()
  }

  getCurrentSongId() {
    return this.currentSongId.asObservable()
  }

  getCurrentSongIndex() {
    return this.currentSongIndex.asObservable()
  }

  getCurrentSongLength() {
    return this.currentSongLength.asObservable()
  }

  getCurrentSongDuration() {
    return this.currentSongDuration.asObservable()
  }

  getCurrentTime() {
    return this.currentTime.asObservable()
  }

  isPaused() {
    return this.paused.asObservable()
  }

  getMusicList() {
    return this.musicList.asObservable()
  }


  setAudio(audio: any) {
    this.audio.next(audio);
  }

  setAudioVolume(volume: number) {
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

  playAudio() {
    this.audio.value.play()
  }

  pauseAudio() {
    this.audio.value.pause()
  }

  setCurrentPlaylist(list: ISong[]) {
    this.currentPlaylist.next(list)
  }

  setCurrentSong(song: any) {
    this.currentSong.next(song);
  }

  setCurrentSongId(id: string) {
    this.currentSongId.next(id);
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

  setMusicList(list: ISong[]) {
    this.songs = list
    this.musicList.next(list);
  }

}
