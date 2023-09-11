import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ItemsComponent } from './items/items.component';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { ArtistsComponent } from './artists/artists.component';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    InicioComponent,
    LoginComponent,
    NavbarComponent,
    ItemsComponent,
    BarraBusquedaComponent,
    PlaylistsComponent,
    ArtistsComponent,
    PanelControlComponent
  ],
  imports: [
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
  bootstrap: [AppComponent, RegistroComponent]
})
export class AppModule { }
