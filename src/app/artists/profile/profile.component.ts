import { Component } from '@angular/core';
import { ArtistsService } from '../artists.service';
import { ActivatedRoute } from '@angular/router';
import { ISong } from 'src/app/models/ISong';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  nickname: string = ""
  songs!: ISong[]

  constructor(
    private artistsService: ArtistsService,
    private activatedRoute: ActivatedRoute
    ){}

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.nickname = params['nickname']
      this.loadItems()
    })
  }

  loadItems(){
    this.artistsService.getSongsByNickname(this.nickname)
    .then(snap => {
      this.songs = snap.docs.map(doc => doc.data() as ISong)
      console.log(this.songs)
    })
    .catch(err => console.log(err))
  }

  play(){}

}
