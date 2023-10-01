import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin!: FormGroup

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.formLogin = this.iniciarFormulario()
  }

  iniciarFormulario(): FormGroup {
    return this.fb.group({
      correo: [''],
      contrasenia: ['']
    })
  }

  iniciarSesion() {
    console.log("Correo: "+this.formLogin.get('correo')?.value+", contraseña: "+this.formLogin.get('contrasenia')?.value);
  }
}
