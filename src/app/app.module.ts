import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { RegistroModule } from './registro/registro.module';
import { LoginModule } from './login/login.module';
import { NavbarModule } from './navbar/navbar.module';
import { BarraBusquedaModule } from './barra-busqueda/barra-busqueda.module';
import { PanelControlModule } from './panel-control/panel-control.module';
import { ItemsModule } from './items/items.module';
import { InicioModule } from './inicio/inicio.module';
import { ArtistsModule } from './artists/artists.module';
import { PlaylistsModule } from './playlists/playlists.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RegistroModule,
    LoginModule,
    NavbarModule,
    BarraBusquedaModule,
    PanelControlModule,
    ItemsModule,
    InicioModule,
    ArtistsModule,
    PlaylistsModule,
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
