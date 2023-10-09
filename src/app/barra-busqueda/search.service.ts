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

}
