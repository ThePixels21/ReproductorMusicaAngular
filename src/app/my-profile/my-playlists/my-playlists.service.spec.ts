import { TestBed } from '@angular/core/testing';

import { MyPlaylistsService } from '../my-playlists.service';

describe('MyPlaylistsService', () => {
  let service: MyPlaylistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPlaylistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
