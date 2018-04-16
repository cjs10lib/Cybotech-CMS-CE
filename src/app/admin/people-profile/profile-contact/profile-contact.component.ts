import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-contact',
  templateUrl: './profile-contact.component.html',
  styleUrls: ['./profile-contact.component.scss']
})
export class ProfileContactComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('person-profile') person = {};

  constructor() { }

  ngOnInit() {
  }

}
