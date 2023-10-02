import { Component, Input } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  activeSesion: boolean = false

  constructor(private loginService: LoginService){
    this.loginService.userState().subscribe(res => {
      if(res){
        this.activeSesion = true
      }else{
        this.activeSesion = false
      }
    })
  }


  @Input() activeComponent: string = ''

  logout(){
    this.loginService.logout()
    .then(res => {
      console.log("Logout successful")
    })
    .catch(error => console.log(error))
  }

}
