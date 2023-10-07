import { Component } from '@angular/core';
import { UploadSongService } from './upload-song.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-song',
  templateUrl: './upload-song.component.html',
  styleUrls: ['./upload-song.component.css']
})
export class UploadSongComponent {

  songForm!: FormGroup

  constructor(
    private uploadSongService: UploadSongService, 
    private fb: FormBuilder
    ){}

  ngOnInit(){
    this.songForm = this.initializeForm()
  }
  
  initializeForm(){
    return this.fb.group({
      name: ['', [Validators.required]],
      file: [null, [Validators.required]]
    })
  }

  uploadSong(){
    if(this.songForm.valid && this.songForm.get('file')!!.value != null){
      console.log(this.songForm.get('file')!!.value)
      const file: File = this.songForm.get('file')!!.value
      console.log(file)
      if(file.type.startsWith('audio/')){
        this.uploadSongService.uploadSong(file)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      }else {
        console.log('Only supported songs')
      }
    } else {
      console.log('Nó válido')
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.songForm.get('file')!!.setValue(file);
    }
  }

}
