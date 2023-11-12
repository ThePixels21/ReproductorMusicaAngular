import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, User, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { MyPlaylistsService } from '../my-profile/my-playlists.service';
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
  private currentUser = new BehaviorSubject(this.emptyUser)
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
        if(this.auth.currentUser != null){
          this.currentUser.next(res.data() as IUser)
          this.userDataReady.next();
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

}
