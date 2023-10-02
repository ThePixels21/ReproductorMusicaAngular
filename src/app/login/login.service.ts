import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, User, signOut } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject: BehaviorSubject<User | null>;
  user$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.userSubject = new BehaviorSubject<User | null>(null)
    this.user$ = this.userSubject.asObservable();
    onAuthStateChanged(this.auth, (user) => {this.userSubject.next(user)})
  }

  login(email: string, pass: string){
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  logout(){
    return signOut(this.auth)
  }

  userState(){
    return this.user$
  }

}
