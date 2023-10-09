import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';
import { ISong } from 'src/app/models/ISong';
import { SongService } from 'src/app/inicio/song.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  icLinesSuccess = '../../assets/icon/more_horizontal_lines.svg';
  icLinesWhite = '../../assets/icon/more_horizontal_lines_white.svg';

  keyword = ""
  currentSongId: string = ""
  songs !: ISong[]
  currentPlaylist!: ISong[]

  constructor(
    private searchService: SearchService,
    private songService: SongService,
    private activatedRoute: ActivatedRoute
  ){

    this.songService.getCurrentSongId().subscribe(index => {
      this.currentSongId = index
    })

    this.songService.getCurrentPlaylist().subscribe(songs => {
      this.currentPlaylist = songs
    })
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.keyword = params['keyword']
      this.searchSongs()
    })
  }

  searchSongs(){
    this.searchService.searchSongs(this.keyword)
    .then(snap => {
      this.songs = snap.docs.map(doc => doc.data() as ISong)
      console.log(this.songs)
    })
    .catch(err => console.log(err))
  }

  play(song: ISong){
    let index: number = this.currentPlaylist.findIndex(s => s.id == song.id)
    this.songService.setCurrentSongIndex(index)
    this.songService.setCurrentSongId(song.id!!)
    this.songService.setCurrentSong(song)
    this.songService.setAudioUrlAndPlay(song.url)
  }

}
