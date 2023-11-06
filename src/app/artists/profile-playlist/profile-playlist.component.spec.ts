import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePlaylistComponent } from './profile-playlist.component';

describe('ProfilePlaylistComponent', () => {
  let component: ProfilePlaylistComponent;
  let fixture: ComponentFixture<ProfilePlaylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePlaylistComponent]
    });
    fixture = TestBed.createComponent(ProfilePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
