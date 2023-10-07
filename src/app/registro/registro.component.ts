import { Component } from '@angular/core';
import { RegistroService } from './registro.service';
import { Router } from '@angular/router';
import { SwalUtils } from '../utils/swal-utils';
import IUser from '../models/IUser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formUsuario!: FormGroup
  nickNameUsed = false

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
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      repContrasenia: ['', [Validators.required]]
    })
  }

  async registrarse() {
    if(this.formUsuario.valid){
      var name = this.formUsuario.value.nombre
      var surname = this.formUsuario.value.apellido
      var nickname = this.formUsuario.value.nickname
      var age = this.formUsuario.value.edad
      var email = this.formUsuario.value.correo
      var pass = this.formUsuario.value.contrasenia
      var cpass = this.formUsuario.value.repContrasenia

      if(pass == cpass && age > 4 && age < 121){
        var user: IUser = {
          uid: '',
          name: name,
          surname: surname,
          nickname: nickname,
          age: age,
          email: email
        }

        if(await this.registroService.isNicknameUnique(nickname)){
          this.nickNameUsed = false
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
        } else {
          this.nickNameUsed = true
        }
      }
    }
  }
}
