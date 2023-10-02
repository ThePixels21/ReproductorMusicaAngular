import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, addDoc } from '@angular/fire/firestore';
import IUser from '../models/IUser';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private auth: Auth, private firestore: Firestore) {}

  registerAccount(email : string, pass: string){
    return createUserWithEmailAndPassword(this.auth, email, pass)
  }

  saveUser(user: IUser){
    const userRef = collection(this.firestore, 'users');
    const docRef = doc(userRef, user.uid)
    return setDoc(docRef, user);
  }

}
