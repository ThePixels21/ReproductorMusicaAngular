import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';

//Firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

//Modules
import { RegistroModule } from './registro/registro.module';
import { LoginModule } from './login/login.module';
import { NavbarModule } from './navbar/navbar.module';
import { BarraBusquedaModule } from './barra-busqueda/barra-busqueda.module';
import { PanelControlModule } from './panel-control/panel-control.module';
import { ItemsModule } from './items/items.module';
import { InicioModule } from './inicio/inicio.module';
import { ArtistsModule } from './artists/artists.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileModule } from './profile/profile.module';
import { UploadSongModule } from './upload-song/upload-song.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    RegistroModule,
    LoginModule,
    NavbarModule,
    BarraBusquedaModule,
    PanelControlModule,
    ItemsModule,
    InicioModule,
    ArtistsModule,
    PlaylistsModule,
    ProfileModule,
    UploadSongModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
