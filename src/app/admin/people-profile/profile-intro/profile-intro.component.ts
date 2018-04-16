import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-intro',
  templateUrl: './profile-intro.component.html',
  styleUrls: ['./profile-intro.component.scss']
})
export class ProfileIntroComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('person-profile') person = {};

  // tslint:disable-next-line:no-input-rename
  @Input('person-image') personImage;

  constructor() { }

  ngOnInit() {
  }

}
