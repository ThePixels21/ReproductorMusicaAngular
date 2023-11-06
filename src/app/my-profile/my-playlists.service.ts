import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { getApps, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { IPlaylist } from '../models/IPlaylist';

@Injectable({
  providedIn: 'root'
})
export class MyPlaylistsService {

  constructor(private firestore: Firestore) {
    if (!getApps().length) {
      initializeApp(environment.firebase)
    }
  }

  savePlaylist(playlist: IPlaylist) {
    const playlistRef = collection(this.firestore, 'playlists')
    const docRef = doc(playlistRef)
    const id = docRef.id
    playlist.id = id
    return setDoc(docRef, playlist)
  }

  getPlaylistsByNickname(nickname: string) {
    const playlistCollection = collection(this.firestore, 'playlists')
    const playlistQuery = query(playlistCollection, where('userNickname', '==', nickname))
    return getDocs(playlistQuery)
  }

  getPlaylistById(id: string) {
    const playlistDoc = doc(this.firestore, 'playlists', id)
    return getDoc(playlistDoc)
  }

  async getSongsFromPlaylist(playlist: IPlaylist) {
    const songsCollection = collection(this.firestore, 'songs');
    let songs = [];

    for (let songId of playlist.songsIds) {
      const songDoc = doc(songsCollection, songId);
      const songSnapshot = await getDoc(songDoc);

      if (songSnapshot.exists()) {
        songs.push(songSnapshot.data());
      }
    }

    return songs;
  }

  async updatePlaylistSongs(playlistId: string, songIds: string[]) {
    const playlistRef = doc(this.firestore, 'playlists', playlistId);
    await updateDoc(playlistRef, {
      songsIds: songIds
    });
  }

  deletePlaylist(playlistId: string) {
    const playlistRef = doc(this.firestore, 'playlists', playlistId);
    return deleteDoc(playlistRef);
}

}
