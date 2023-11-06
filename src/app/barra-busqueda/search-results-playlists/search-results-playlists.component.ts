import { Component } from '@angular/core';
import { IPlaylist } from 'src/app/models/IPlaylist';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-results-playlists',
  templateUrl: './search-results-playlists.component.html',
  styleUrls: ['./search-results-playlists.component.css']
})
export class SearchResultsPlaylistsComponent {

  loading = true
  playlists!: IPlaylist[]
  keyword = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.keyword = params['keyword']
      this.searchPlaylists()
    })
  }

  searchPlaylists(){
    this.searchService.searchPlaylists(this.keyword)
    .then(snap => {
      this.playlists = snap.docs.map(doc => doc.data() as IPlaylist)
      this.loading = false
      console.log(this.playlists)
    })
    .catch(err => console.log(err))
  }

}
