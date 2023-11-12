import { Component, Input } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import IUser from '../models/IUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  activeSesion: boolean = false
  private currentUser: IUser | null = null

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginService.getCurrentUser().subscribe(current => {
      this.currentUser = current
      if(this.currentUser != null){
        this.activeSesion = true
      }else{
        this.activeSesion = false
      }
    })
  }

  logout() {
    this.loginService.logout()
      .then(res => {
        console.log("Logout successful")
      })
      .catch(error => console.log(error))
  }

  onProfile() {
    this.router.navigate(['/my-profile', this.currentUser?.nickname, 'songs'])
  }

}
