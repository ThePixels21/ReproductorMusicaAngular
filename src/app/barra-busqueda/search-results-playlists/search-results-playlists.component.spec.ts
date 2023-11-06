import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsPlaylistsComponent } from './search-results-playlists.component';

describe('SearchResultsPlaylistsComponent', () => {
  let component: SearchResultsPlaylistsComponent;
  let fixture: ComponentFixture<SearchResultsPlaylistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsPlaylistsComponent]
    });
    fixture = TestBed.createComponent(SearchResultsPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
