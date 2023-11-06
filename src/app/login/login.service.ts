import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, User, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { MyPlaylistsService } from '../my-profile/my-playlists.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject: BehaviorSubject<User | null>;
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
      sessionStorage.setItem('uid', id)
      const res = await this.getUserById(id);
      if (res.exists()) {
        const nickname: string = res.data()['nickname']
        const name: string = res.data()['name']
        const surname: string = res.data()['surname']
        sessionStorage.setItem('nickname', nickname)
        sessionStorage.setItem('name', name)
        sessionStorage.setItem('surname', surname)
      }
      this.userDataReady.next();
    } catch (err) {
      console.log(err)
      sessionStorage.setItem('nickname', 'none')
      sessionStorage.setItem('name', 'none')
      sessionStorage.setItem('surname', 'none')
    }
  }

}
