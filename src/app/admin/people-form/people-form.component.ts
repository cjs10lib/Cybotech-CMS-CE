import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.scss']
})
export class PeopleFormComponent implements OnInit {

  // Breadcrum
  title = 'New Registration';
  icon = 'person_add';
  pageBanner = 'url(\'../../assets/banner/banner 1.jpg\')';

  personId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.personId = this.route.snapshot.paramMap.get('id');
  }

}


