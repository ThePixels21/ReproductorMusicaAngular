import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RegistroService } from './registro.service';
import { Router } from '@angular/router';
import { SwalUtils } from '../utils/swal-utils';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formUsuario!: FormGroup

  constructor(
    private fb: FormBuilder, 
    private registroService: RegistroService,
    private router: Router
    ){}

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
    this.registroService.registerAccount(this.formUsuario.value.correo, this.formUsuario.value.contrasenia)
    .then(res => {
      console.log(res)
      this.router.navigate(['/login'])
      SwalUtils.customMessageOk('Welcome', 'Successful registration')})
    .catch(err => console.log(err))
  }
}
