import { PersonDetails, Person } from './../../models/person.model';
import { Observable } from 'rxjs/Observable';
import { PeopleService } from './../../services/people.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {
  title = 'People';
  icon = 'people';
  pageBanner = 'url(\'../../assets/banner/banner 1.jpg\')';

  details: PersonDetails[] = [];

  subcription: Subscription;

  constructor(private peopleService: PeopleService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.subcription = this.peopleService.getPeople()
      .subscribe(resp => {
        this.details = resp;
      });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}
