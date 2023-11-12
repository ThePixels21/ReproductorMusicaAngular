import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, User, signOut, sendPasswordResetEmail } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import IUser from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private emptyUser: IUser = {
    uid: '',
    name: '',
    surname: '',
    nickname: '',
    age: 0,
    email: ''
  }

  private userSubject: BehaviorSubject<User | null>;
  private currentUser: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  user$: Observable<User | null>;
  userDataReady = new ReplaySubject<void>();

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.userSubject = new BehaviorSubject<User | null>(null)
    this.user$ = this.userSubject.asObservable();
    onAuthStateChanged(this.auth, (user) => { this.userSubject.next(user) })
    this.userState().subscribe(res => {
      if (res) {
        this.saveUserData(res.uid)
      } else {
        sessionStorage.clear()
      }
    })
  }

  getCurrentUser() {
    return this.currentUser.asObservable()
  }

  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  logout() {
    sessionStorage.clear()
    this.currentUser.next(null)
    return signOut(this.auth)
  }

  userState() {
    return this.user$
  }

  getUserById(id: string) {
    const userRef = doc(this.firestore, 'users', id)
    return getDoc(userRef)
  }

  async saveUserData(id: string) {
    try {
      const res = await this.getUserById(id);
      if (res.exists()) {
        if (this.auth.currentUser != null) {
          this.currentUser.next(res.data() as IUser)
          this.userDataReady.next();
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  sendResetPasswordEmail(email: string) {
    return sendPasswordResetEmail(this.auth, email)
  }

}
