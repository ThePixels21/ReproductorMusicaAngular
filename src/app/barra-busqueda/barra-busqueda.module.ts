import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarraBusquedaRoutingModule } from './barra-busqueda-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { SearchResultsComponent } from './search-results/search-results.component';


@NgModule({
  declarations: [
    BarraBusquedaComponent,
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    BarraBusquedaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    BarraBusquedaComponent,
    SearchResultsComponent
  ]
})
export class BarraBusquedaModule { }
