import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSongsComponent } from './profile-songs.component';

describe('ProfileSongsComponent', () => {
  let component: ProfileSongsComponent;
  let fixture: ComponentFixture<ProfileSongsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileSongsComponent]
    });
    fixture = TestBed.createComponent(ProfileSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
