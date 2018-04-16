import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss']
})
export class ProfileMainComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('person-profile') person: {};

  constructor() { }

  ngOnInit() {
  }

}
