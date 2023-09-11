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
    'nickname': new FormControl(''),
    'edad': new FormControl(''),
    'correo': new FormControl(''),
    'contrasenia': new FormControl(''),
    'repContrasenia': new FormControl('')
  });

  registrarse() {
    console.log("Usuario: nombre: "+this.formUsuario.get('nombre')?.value+", apellido: "+this.formUsuario.get('apellido')?.value+", nickname: "+this.formUsuario.get('nickname')?.value+", edad: "+this.formUsuario.get('edad')?.value+", correo: "+this.formUsuario.get('correo')?.value+", contraseña"+this.formUsuario.get('contrasenia')?.value);
  }
}
