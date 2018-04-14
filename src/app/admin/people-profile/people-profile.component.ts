import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people-profile',
  templateUrl: './people-profile.component.html',
  styleUrls: ['./people-profile.component.scss']
})
export class PeopleProfileComponent implements OnInit {

  title = 'Profile';
  icon = 'person';
  pageBanner = 'url(\'../../assets/banner/banner 1.jpg\')';

  constructor() { }

  ngOnInit() {

  }

}
