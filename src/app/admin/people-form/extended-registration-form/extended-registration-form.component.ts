import { Family, FamilyMembers } from './../../../models/person-family.model';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PersonDetails } from '../../../models/person-details.model';
import { PeopleService } from './../../../services/people.service';

@Component({
  selector: 'app-extended-registration-form',
  templateUrl: './extended-registration-form.component.html',
  styleUrls: ['./extended-registration-form.component.scss']
})
export class ExtendedRegistrationFormComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('person-id') personId;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}


