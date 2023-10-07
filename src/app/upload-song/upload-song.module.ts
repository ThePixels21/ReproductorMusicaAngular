import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadSongRoutingModule } from './upload-song-routing.module';
import { UploadSongComponent } from './upload-song.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UploadSongComponent
  ],
  imports: [
    CommonModule,
    UploadSongRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UploadSongComponent
  ]
})
export class UploadSongModule { }
