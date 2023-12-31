import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, collection } from '@angular/fire/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid'
import { ISong } from '../models/ISong';

@Injectable({
  providedIn: 'root'
})
export class UploadSongService {

  private storage: any;

  constructor(private firestore: Firestore) { 
    if(!getApps().length){
      initializeApp(environment.firebase)
    }
    this.storage = getStorage()
   }

  uploadSong(file: any){
    const uniqueId = uuidv4()
    const songRef = ref(this.storage, `songs/${uniqueId}_${file.name}`)
    return uploadBytes(songRef, file)
  }

  saveSong(song: ISong){
    const songRef = collection(this.firestore, 'songs')
    const docRef = doc(songRef)
    const id = docRef.id
    song.id = id
    return setDoc(docRef, song)
  }

  getDownloadUrl(songRef: any){
    return getDownloadURL(songRef)
  }

}
