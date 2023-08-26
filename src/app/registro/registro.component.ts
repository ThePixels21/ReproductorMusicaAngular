import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formUsuario = new FormGroup({
    'nombre': new FormControl(''),
    'apellido': new FormControl(''),
    'edad': new FormControl(''),
    'correo': new FormControl(''),
    'contrasenia': new FormControl(''),
    'repContrasenia': new FormControl('')
  });

  registrarse() {
    
  }
}
