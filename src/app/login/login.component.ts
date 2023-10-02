import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalUtils } from '../utils/swal-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin!: FormGroup

  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService,
    private router: Router
    ){}

  ngOnInit(){
    this.formLogin = this.iniciarFormulario()
  }

  iniciarFormulario(): FormGroup {
    return this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  login() {
    if(this.formLogin.valid){
      this.loginService.login(this.formLogin.value.correo, this.formLogin.value.contrasenia)
      .then(res => {
        console.log(res)
        this.router.navigate([''])
        SwalUtils.customMessageOk('Welcome', 'Login Successful')
      })
      .catch(
        err => {
          console.log(err)
          SwalUtils.customMessageError('Error', 'Verify your credentials')
        })
    }
  }
}