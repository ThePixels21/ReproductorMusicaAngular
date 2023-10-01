import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private auth: Auth) {}

  registerAccount(email : string, pass: string){
    return createUserWithEmailAndPassword(this.auth, email, pass)
  }

}
