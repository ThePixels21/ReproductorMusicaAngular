import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  constructor(private firestore: Firestore) { }

  getPublicPlaylists() {
    const playlistCollection = collection(this.firestore, 'playlists')
    const playlistQuery = query(playlistCollection, where('public', '==', true))
    return getDocs(playlistQuery)
  }
}
