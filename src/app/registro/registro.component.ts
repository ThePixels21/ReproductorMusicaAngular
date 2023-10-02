import { Component } from '@angular/core';
import { RegistroService } from './registro.service';
import { Router } from '@angular/router';
import { SwalUtils } from '../utils/swal-utils';
import IUser from '../models/IUser';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    var name = this.formUsuario.value.nombre
    var surname = this.formUsuario.value.apellido
    var nickname = this.formUsuario.value.nickname
    var age = this.formUsuario.value.edad
    var email = this.formUsuario.value.correo
    var pass = this.formUsuario.value.contrasenia

    var user: IUser = {
      uid: '',
      name: name,
      surname: surname,
      nickname: nickname,
      age: age,
      email: email
    }

    this.registroService.registerAccount(email, pass)
    .then(res => {
      console.log(res)
      const uid = res.user.uid
      user.uid = uid
      this.registroService.saveUser(user)
      .then(res => {
        this.router.navigate(['/login'])
        SwalUtils.customMessageOk('Welcome', 'Successful registration')
      }).catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
}
