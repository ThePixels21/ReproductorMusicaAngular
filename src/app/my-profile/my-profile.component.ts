import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  nickname: string = ""

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.nickname = params['nickname']
    })
  }

}
