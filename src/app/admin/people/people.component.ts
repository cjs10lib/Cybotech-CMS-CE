import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PeopleService } from './../../services/people.service';
import { PersonDetails } from '../../models/person-details.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {
  title = 'People';
  icon = 'people';
  pageBanner = 'url(\'../../assets/banner/banner 1.jpg\')';

  // details: PersonDetails[] = [];
  details$: Observable<PersonDetails[]>;

  searchQuery;
  peopleDetails: PersonDetails[];
  filteredDetails: PersonDetails[];

  subscription: Subscription;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    // this.details$ = this.peopleService.getPeople();
    this.subscription = this.peopleService.getPeople()
      .subscribe(resp => {
        this.peopleDetails = resp;
        this.filteredDetails = resp;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  search(query: string) {
    this.filteredDetails = query ?
    this.peopleDetails.filter(
      p => p.person.fullname.toLowerCase().includes(query.toLowerCase())) : this.peopleDetails;
  }

  clearSearchField() {
    this.search('');
    this.searchQuery = '';
  }
}
