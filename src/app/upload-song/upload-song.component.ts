import { Component } from '@angular/core';
import { UploadSongService } from './upload-song.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISong } from '../models/ISong';
import { SwalUtils } from '../utils/swal-utils';
import Swal from 'sweetalert2';
import { SongService } from '../inicio/song.service';
import { LoginService } from '../login/login.service';
import IUser from '../models/IUser';

@Component({
  selector: 'app-upload-song',
  templateUrl: './upload-song.component.html',
  styleUrls: ['./upload-song.component.css']
})
export class UploadSongComponent {

  songForm!: FormGroup
  fileTouched = false
  titleTouched = false
  private currentUser: IUser | null = null

  constructor(
    private uploadSongService: UploadSongService,
    private songService: SongService,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {
    this.loginService.getCurrentUser().subscribe(current => {
      this.currentUser = current
    })
  }

  ngOnInit() {
    this.songForm = this.initializeForm()
  }

  initializeForm() {
    return this.fb.group({
      title: ['', [Validators.required]],
      file: [null, [Validators.required]]
    })
  }

  async uploadSong() {
    if (this.songForm.valid && this.songForm.get('file')!!.value != null && this.currentUser != null) {
      var song: ISong = {
        userId: this.currentUser.uid,
        title: this.songForm.value.title,
        lowerCaseTitle: this.songForm.value.title.toLowerCase(),
        artist: this.currentUser.nickname,
        url: ''
      }
      const file: File = this.songForm.get('file')!!.value
      console.log(file)
      if (file.type.startsWith('audio/')) {
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
          this.resetForm()
        } catch (err) {
          console.log(`Error uploading song----------\n${err}`);
          SwalUtils.customMessageError('Error uploading', 'Contact support')
        }
      } else {
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
    } else {
      this.songForm.get('file')!!.setValue(null);
    }
  }

  resetForm() {
    this.songForm = this.initializeForm()
    this.fileTouched = false
    this.titleTouched = false
    let fileInput: any = document.querySelector('#fileInput')
    fileInput.value = ''
  }

}
