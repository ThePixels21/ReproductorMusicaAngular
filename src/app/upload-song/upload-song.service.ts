import { Injectable } from '@angular/core';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class UploadSongService {

  private storage: any;

  constructor() { 
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

}
