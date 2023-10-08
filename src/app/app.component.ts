import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reproductor';

  constructor(private loginService: LoginService){
    this.loginService.userState().subscribe(res => {
      if(res){
        this.saveUserData(res.uid)
      }else{
        sessionStorage.clear()
      }
    })
  }

  saveUserData(id: string){
    sessionStorage.setItem('uid', id)
    this.loginService.getUserById(id)
    .then(res => {
      if(res.exists()){
        const nickname: string = res.data()['nickname']
        const name: string = res.data()['name']
        const surname: string = res.data()['surname']
        sessionStorage.setItem('nickname', nickname)
        sessionStorage.setItem('name', name)
        sessionStorage.setItem('surname', surname)
      }
    })
    .catch(err => {
      console.log(err)
      sessionStorage.setItem('nickname', 'none')
      sessionStorage.setItem('name', 'none')
      sessionStorage.setItem('surname', 'none')
    })
  }

}
