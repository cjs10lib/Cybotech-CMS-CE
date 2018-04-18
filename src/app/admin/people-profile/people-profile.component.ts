import { ResponsiveLayoutService } from './../../services/responsive-layout.service';
import { ActivatedRoute } from '@angular/router';
import { Person, PersonDetails } from './../../models/person.model';
import { PeopleService } from './../../services/people.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-people-profile',
  templateUrl: './people-profile.component.html',
  styleUrls: ['./people-profile.component.scss']
})
export class PeopleProfileComponent implements OnInit {
  title = 'Profile';
  icon = 'person';
  pageBanner = 'url(\'../../assets/banner/banner 1.jpg\')';

  // personImage;

  details: PersonDetails = {
    person: {
      education: {},
      occupation: {},
      contact: {},
    }
  };

  constructor(private peopleService: PeopleService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    // tslint:disable-next-line:curly
    if (!id)
      return;

    this.peopleService.getPerson(id)
      .take(1).subscribe(resp => {
        this.details = resp;

       // this.personImage = this.sanitizer.bypassSecurityTrustUrl(this.details.imageURL);
      });
  }
}
