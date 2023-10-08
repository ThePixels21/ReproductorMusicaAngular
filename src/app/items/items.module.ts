import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { PanelControlModule } from '../panel-control/panel-control.module';
import { BarraBusquedaModule } from '../barra-busqueda/barra-busqueda.module';


@NgModule({
  declarations: [
    ItemsComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    PanelControlModule,
    BarraBusquedaModule
  ],
  exports: [
    ItemsComponent
  ]
})
export class ItemsModule { }
