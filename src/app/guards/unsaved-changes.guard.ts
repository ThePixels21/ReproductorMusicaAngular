import { Injectable } from '@angular/core';
import { RegistroComponent } from '../registro/registro.component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard {
  canDeactivate(component: RegistroComponent): boolean {
    if (component.formUsuario.dirty && !component.formUsuario.valid) {
      return window.confirm('You have unsaved changes. Are you sure you want to leave?');
    }
    return true;
  }
}