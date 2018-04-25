import { Family } from './../../models/person-family.model';
import { PersonFamilyService } from './../../services/person-family.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { Subscription } from 'rxjs/Subscription';
import { PersonDetails } from '../../models/person-details.model';

@Component({
  selector: 'app-people-search',
  templateUrl: './people-search.component.html',
  styleUrls: ['./people-search.component.scss']
})
export class PeopleSearchComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('search-query') searchQuery;

  @Input('family') family: Family;

  // tslint:disable-next-line:no-input-rename
  @Input('show-add-family-members') showAddFamilyMembers;

  peopleDetails: PersonDetails[];
  filteredDetails: PersonDetails[];

  subscription: Subscription;

  constructor(private peopleService: PeopleService, private personFamilyService: PersonFamilyService) { }

  ngOnInit() {
    this.subscription = this.peopleService.getPeople()
    .subscribe(resp => {
      // tslint:disable-next-line:curly
      if (resp)
        return this.peopleDetails = resp;
    });

    this.filteredDetails = null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // addToFamily(event, personId) {
  //   // tslint:disable-next-line:curly
  //   if (!this.family)
  //     return console.log('Add a family before adding members');

  //   this.personFamilyService.addPersonToFamily(personId, this.family.id);
  // }

  search(query: string) {
    this.filteredDetails = query ?
    this.peopleDetails.filter(
      p => p.person.fullname.toLowerCase().includes(query.toLowerCase())) : null;
  }

  clearSearchField() {
    this.searchQuery = '';
    this.search('');
  }
}
