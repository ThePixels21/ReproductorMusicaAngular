import { Component } from '@angular/core';
import IUser from '../../models/IUser';
import { ArtistsService } from '../artists.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent {

  users: IUser[] = []
  loading = true

  constructor(private artistsService: ArtistsService) { }

  ngOnInit(){
    this.artistsService.getUsersWithSongs()
    .then(users => {
      this.users = users as IUser[]
      this.loading = false
      console.log(this.users)
    })
    .catch(err => console.log(err))
  }



}
