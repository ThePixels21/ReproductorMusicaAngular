import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin = new FormGroup({
    'correo': new FormControl(''),
    'contrasenia': new FormControl('')
  })

  iniciarSesion() {
    console.log("Correo: "+this.formLogin.get('correo')?.value+", contraseña: "+this.formLogin.get('contrasenia')?.value);
  }
}
