import { Component } from '@angular/core';
import { IPlaylist } from 'src/app/models/IPlaylist';
import { MyPlaylistsService } from '../my-playlists.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalUtils } from 'src/app/utils/swal-utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-playlists',
  templateUrl: './my-playlists.component.html',
  styleUrls: ['./my-playlists.component.css']
})
export class MyPlaylistsComponent {

  icLinesSuccess = '../../assets/icon/more_horizontal_lines.svg';
  icAdd = '../../../assets/icon/add.svg'
  formAdd!: FormGroup

  nickname!: string
  playlists!: IPlaylist[]

  constructor(
    private fb: FormBuilder,
    private playlistService: MyPlaylistsService, 
    private activatedRoute: ActivatedRoute
    ){
      this.playlistService.getMyPlaylists().subscribe(playlists => {
        this.playlists = playlists
      })
    }

  ngOnInit(){
    this.formAdd = this.initForm()
    this.activatedRoute.parent!!.params.subscribe(params => {
      this.nickname = params['nickname']
    })
  }

  initForm(): FormGroup{
    return this.fb.group({
      name: ['', Validators.required]
    })
  }

  async addPlaylist(){
    if(this.formAdd.valid){
      SwalUtils.loadingMessage('Creating...')
      var playlist: IPlaylist = {
        id: '',
        userNickname: this.nickname,
        name: this.formAdd.value.name,
        songsIds: []
      }
      try{
        const result = await this.playlistService.savePlaylist(playlist)
        console.log(`Uploaded successful---------\n${result}`)
        Swal.close()
        SwalUtils.customMessageOk('Created', 'Playlist created succesfully')
        this.playlistService.loadPlaylists()
      }catch(err){
        console.log(`Error creating playlist----------\n${err}`);
        SwalUtils.customMessageError('Error creating playlist', 'Contact support')
      }
    }
  }

  deletePlaylist(playlistId: string){
    SwalUtils.loadingMessage('Deleting...')
    this.playlistService.deletePlaylist(playlistId)
    .then(res => {
      Swal.close()
      SwalUtils.customMessageOk('Deleted', 'Playlist deleted succesfully')
      this.playlistService.loadPlaylists()
    })
    .catch(err => {
      console.log(err)
      SwalUtils.customMessageError('Error deleting playlist', 'Contact support')
    })
  }

}
