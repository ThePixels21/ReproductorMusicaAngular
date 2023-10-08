import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import IUser from '../models/IUser';

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

  getSongsByNickname(nickname: string){
    const songCollection = collection(this.firestore, 'songs')
    const songQuery = query(songCollection, where('artist', '==', nickname))
    return getDocs(songQuery)
  }

}
