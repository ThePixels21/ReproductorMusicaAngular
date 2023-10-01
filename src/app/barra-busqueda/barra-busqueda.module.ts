import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarraBusquedaRoutingModule } from './barra-busqueda-routing.module';
import { BarraBusquedaComponent } from './barra-busqueda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BarraBusquedaComponent
  ],
  imports: [
    CommonModule,
    BarraBusquedaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    BarraBusquedaComponent
  ]
})
export class BarraBusquedaModule { }
