import { Component } from '@angular/core';
import { IPlaylist } from 'src/app/models/IPlaylist';
import { MyPlaylistsService } from './my-playlists.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-playlists',
  templateUrl: './my-playlists.component.html',
  styleUrls: ['./my-playlists.component.css']
})
export class MyPlaylistsComponent {

  icAdd = '../../../assets/icon/add.svg'
  formAdd!: FormGroup

  nickname!: string
  playlists!: IPlaylist[]

  constructor(
    private fb: FormBuilder,
    private playlistService: MyPlaylistsService, 
    private activatedRoute: ActivatedRoute
    ){}

  ngOnInit(){
    this.formAdd = this.initForm()
    this.activatedRoute.parent!!.params.subscribe(params => {
      this.nickname = params['nickname']
      this.loadItems()
    })
  }

  initForm(): FormGroup{
    return this.fb.group({
      name: ['', Validators.required]
    })
  }

  loadItems(){
    this.playlistService.getPlaylistsByNickname(this.nickname)
    .then(snap => {
      this.playlists = snap.docs.map(doc => doc.data() as IPlaylist)
      console.log(this.playlists)
    })
    .catch(err => console.log(err))
  }

  addPlaylist(){}

}
