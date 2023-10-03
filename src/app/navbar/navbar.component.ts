import { Component, Input } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  activeSesion: boolean = false

  constructor(private loginService: LoginService, private router: Router){
    this.loginService.userState().subscribe(res => {
      if(res){
        this.activeSesion = true
        sessionStorage.setItem('uid', res.uid)
      }else{
        this.activeSesion = false
      }
    })
  }

  logout(){
    this.loginService.logout()
    .then(res => {
      console.log("Logout successful")
    })
    .catch(error => console.log(error))
  }

  onProfile(){
    this.router.navigate(['/profile', sessionStorage.getItem('uid')])
  }

}
