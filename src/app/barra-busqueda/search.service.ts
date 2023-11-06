import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private firestore: Firestore) { }

  searchSongs(searchText:string){
    const songCollection = collection(this.firestore, 'songs')
    const songQuery = query(songCollection, where('title', '>=', searchText), where('title', '<=', searchText + '\uf8ff'))
    return getDocs(songQuery)
  }

  searchUsers(searchText:string){
    const artistCollection = collection(this.firestore, 'users')
    const artistQuery = query(artistCollection, where('nickname', '>=', searchText), where('nickname', '<=', searchText + '\uf8ff'))
    return getDocs(artistQuery)
  }

  searchPlaylists(searchText:string){
    const artistCollection = collection(this.firestore, 'playlists')
    const artistQuery = query(artistCollection, where('name', '>=', searchText), where('name', '<=', searchText + '\uf8ff'))
    return getDocs(artistQuery)
  }

}
