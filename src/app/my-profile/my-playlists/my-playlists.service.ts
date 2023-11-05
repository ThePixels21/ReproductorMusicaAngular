import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { getApps, initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { IPlaylist } from '../../models/IPlaylist';

@Injectable({
  providedIn: 'root'
})
export class MyPlaylistsService {

  constructor(private firestore: Firestore) { 
    if(!getApps().length){
      initializeApp(environment.firebase)
    }
   }

   savePlaylist(playlist: IPlaylist){
    const playlistRef = collection(this.firestore, 'playlists')
    const docRef = doc(playlistRef)
    const id = docRef.id
    playlist.id = id
    return setDoc(docRef, playlist)
   }

   getPlaylistsByNickname(nickname: string){
    const playlistCollection = collection(this.firestore, 'playlists')
    const playlistQuery = query(playlistCollection, where('userNickname', '==', nickname))
    return getDocs(playlistQuery)
   }

}
