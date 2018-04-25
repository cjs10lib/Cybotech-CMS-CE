import 'rxjs/add/operator/take';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { PeopleService } from '../../../../services/people.service';
import { Family, PersonFamily } from './../../../../models/person-family.model';
import { PersonFamilyService } from './../../../../services/person-family.service';
import { AddFamilyFormComponent } from './../add-family-form/add-family-form.component';

@Component({
  selector: 'app-family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.scss']
})
export class FamilyFormComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('person-id') personId;

  personFamily: PersonFamily = {};

  addFamilyDialog: Family = {};

  families$;

  searchQuery;
  showAddFamilyMembers = false;

  tags = [
    'None',
    'Adult',
    'Teen',
    'Child',
  ];

  subscription: Subscription;

  constructor(private dialog: MatDialog, private peopleService: PeopleService, private personFamilyService: PersonFamilyService) { }

  ngOnInit() {
    this.families$ = this.personFamilyService.getFamilies();

    this.subscription = this.peopleService.getPerson(this.personId)
      .subscribe(resp => {

        // tslint:disable-next-line:curly
        if (resp['family'])
          return this.personFamily = resp['family'];
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddPersonFamily() {
    if (confirm ('Are you sure of saving this record?')) {

      this.personFamily.addedDate = new Date().getTime();
      this.peopleService.updatePersonFamily(this.personId, this.personFamily)
        .then(resp => {
          this.showAddFamilyMembers = true;
        });
    }
  }

  openDialog() {
    this.dialog.open(AddFamilyFormComponent).afterClosed().subscribe(resp => {
        // tslint:disable-next-line:curly
        if (resp)
          this.addFamilyDialog.name = resp;
          return this.addFamily();
      });
  }

  addFamily() {
    this.addFamilyDialog.createdDate = new Date().getTime();
    this.personFamilyService.addFamily(this.addFamilyDialog);
  }

  clearFamilySearchField() {
    this.searchQuery = '';
    this.showAddFamilyMembers = false;
  }
}
