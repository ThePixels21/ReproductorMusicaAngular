import { Component } from '@angular/core';
import { UploadSongService } from './upload-song.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISong } from '../models/ISong';
import { SwalUtils } from '../utils/swal-utils';
import Swal from 'sweetalert2';
import { SongService } from '../inicio/song.service';

@Component({
  selector: 'app-upload-song',
  templateUrl: './upload-song.component.html',
  styleUrls: ['./upload-song.component.css']
})
export class UploadSongComponent {

  songForm!: FormGroup
  fileTouched = false
  titleTouched = false

  constructor(
    private uploadSongService: UploadSongService, 
    private songService: SongService,
    private fb: FormBuilder
    ){}

  ngOnInit(){
    this.songForm = this.initializeForm()
  }
  
  initializeForm(){
    return this.fb.group({
      title: ['', [Validators.required]],
      file: [null, [Validators.required]]
    })
  }

  async uploadSong(){
    if(this.songForm.valid && this.songForm.get('file')!!.value != null){
      var song: ISong = {
        userId: sessionStorage.getItem('uid')!!,
        title: this.songForm.value.title,
        artist: sessionStorage.getItem('nickname')!!,
        url: ''
      }
      const file: File = this.songForm.get('file')!!.value
      console.log(file)
      if(file.type.startsWith('audio/')){
        SwalUtils.loadingMessage('Uploading...')
        try {
          const res = await this.uploadSongService.uploadSong(file);
          const url = await this.uploadSongService.getDownloadUrl(res.ref);
          song.url = url;
          const result = await this.uploadSongService.saveSong(song);
          console.log(`Uploaded successful---------\n${result}`);
          Swal.close()
          SwalUtils.customMessageOk('Uploaded', 'Song uploaded succesfully')
          this.songService.updateMusicList()
        } catch (err) {
          console.log(`Error uploading song----------\n${err}`);
          SwalUtils.customMessageError('Error uploading', 'Contact support')
        }
      }else {
        SwalUtils.customMessageError('Error', 'Audio files only')
        console.log('Only supported songs')
      }
    } else {
      this.fileTouched = true
      this.titleTouched = true
      console.log('Form is not valid')
    }
  }

  onFileChange(event: any) {
    this.fileTouched = true
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.songForm.get('file')!!.setValue(file);
    }else {
      this.songForm.get('file')!!.setValue(null);
    }
  }

}
