import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import IUser from '../models/IUser';
import { IPlaylist } from '../models/IPlaylist';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  constructor(private firestore: Firestore) { }

  async getUsersWithSongs() {
    const songCollection = collection(this.firestore, 'songs')
    const songSnapshot = await getDocs(songCollection)

    //Save unique id of users with songs
    const userIds = new Set()
    songSnapshot.forEach(doc => {
      const song = doc.data()
      userIds.add(song['userId'])
    })

    const userCollection = collection(this.firestore, 'users')
    const userSnapshot = await getDocs(userCollection)

    //Filter only the users with songs
    const usersWithSongs = userSnapshot.docs.map(doc => doc.data()).filter(user => userIds.has(user['uid']))

    return usersWithSongs
  }

  getSongsByNickname(nickname: string) {
    const songCollection = collection(this.firestore, 'songs')
    const songQuery = query(songCollection, where('artist', '==', nickname))
    return getDocs(songQuery)
  }

  getPublicPlaylistsByNickname(nickname: string) {
    const playlistCollection = collection(this.firestore, 'playlists')
    const playlistQuery = query(playlistCollection, where('userNickname', '==', nickname), where('public', '==', true))
    return getDocs(playlistQuery)
  }

}
