import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsArtistsComponent } from './search-results-artists.component';

describe('SearchResultsArtistsComponent', () => {
  let component: SearchResultsArtistsComponent;
  let fixture: ComponentFixture<SearchResultsArtistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsArtistsComponent]
    });
    fixture = TestBed.createComponent(SearchResultsArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
