import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formUsuario!: FormGroup

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.formUsuario = this.inicializarFormulario()
  }

  inicializarFormulario(): FormGroup{
    return this.fb.group({
      nombre: [''],
      apellido: [''],
      nickname: [''],
      edad: [''],
      correo: [''],
      contrasenia: [''],
      repContrasenia: ['']
    })
  }

  registrarse() {
    console.log("Usuario: nombre: "+this.formUsuario.get('nombre')?.value+", apellido: "+this.formUsuario.get('apellido')?.value+", nickname: "+this.formUsuario.get('nickname')?.value+", edad: "+this.formUsuario.get('edad')?.value+", correo: "+this.formUsuario.get('correo')?.value+", contraseña:"+this.formUsuario.get('contrasenia')?.value);
  }
}
