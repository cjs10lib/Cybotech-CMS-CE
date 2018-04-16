import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-demographics',
  templateUrl: './profile-demographics.component.html',
  styleUrls: ['./profile-demographics.component.scss']
})
export class ProfileDemographicsComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('person-profile') person = {};

  constructor() { }

  ngOnInit() {
  }

  getAge() {
    // tslint:disable-next-line:curly
    if (!this.person['dob'])
      return;

    return new Date().getFullYear() - this.person['dob'].getFullYear();
  }
}
