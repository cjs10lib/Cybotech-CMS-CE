import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-education-work',
  templateUrl: './profile-education-work.component.html',
  styleUrls: ['./profile-education-work.component.scss']
})
export class ProfileEducationWorkComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('person-profile') person = {};

  constructor() { }

  ngOnInit() {
  }

}
