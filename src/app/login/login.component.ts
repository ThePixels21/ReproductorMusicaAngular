import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

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
      correo: [''],
      contrasenia: ['']
    })
  }

  login() {
    this.loginService.login(this.formLogin.value.correo, this.formLogin.value.contrasenia)
    .then(res => {
      console.log(res)
      this.router.navigate([''])
    })
    .catch(err => console.log(err))
  }
}