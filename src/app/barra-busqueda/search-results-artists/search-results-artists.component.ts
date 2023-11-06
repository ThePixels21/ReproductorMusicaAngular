import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IUser from 'src/app/models/IUser';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-results-artists',
  templateUrl: './search-results-artists.component.html',
  styleUrls: ['./search-results-artists.component.css']
})
export class SearchResultsArtistsComponent {

  users: IUser[] = []
  loading = true
  keyword = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.keyword = params['keyword']
      this.searchArtists()
    })
  }

  searchArtists(){
    this.searchService.searchUsers(this.keyword)
    .then(snap => {
      this.users = snap.docs.map(doc => doc.data() as IUser)
      this.loading = false
      console.log(this.users)
    })
    .catch(err => console.log(err))
  }

}
