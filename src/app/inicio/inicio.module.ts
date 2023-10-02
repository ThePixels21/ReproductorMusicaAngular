import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { NavbarModule } from '../navbar/navbar.module';
import { BarraBusquedaModule } from '../barra-busqueda/barra-busqueda.module';

@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    NavbarModule,
    BarraBusquedaModule
  ],
  exports: [
    InicioComponent
  ]
})
export class InicioModule { }
