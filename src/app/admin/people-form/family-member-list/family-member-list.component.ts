import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PersonDetails } from '../../../models/person-details.model';
import { PersonFamilyService } from '../../../services/person-family.service';
import { PersonFamily } from './../../../models/person-family.model';

@Component({
  selector: 'app-family-member-list',
  templateUrl: './family-member-list.component.html',
  styleUrls: ['./family-member-list.component.scss']
})
export class FamilyMemberListComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('family') family: PersonFamily;

  members$: PersonDetails[];

  subscription: Subscription;

  constructor(private personFamilyService: PersonFamilyService, private router: Router) { }

  ngOnInit() {

    if (this.family) {
      this.subscription = this.personFamilyService.getFamilyMembers(this.family.familyId)
        .subscribe(resp => {
          this.members$ = resp;
        });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  routeToPerson(event, personId) {
    this.router.navigate(['registration', personId]);
  }
}
