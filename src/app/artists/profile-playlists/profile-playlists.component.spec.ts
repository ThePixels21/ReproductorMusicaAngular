import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePlaylistsComponent } from './profile-playlists.component';

describe('ProfilePlaylistsComponent', () => {
  let component: ProfilePlaylistsComponent;
  let fixture: ComponentFixture<ProfilePlaylistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePlaylistsComponent]
    });
    fixture = TestBed.createComponent(ProfilePlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
