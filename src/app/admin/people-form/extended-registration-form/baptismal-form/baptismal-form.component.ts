import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PersonBaptism } from './../../../../models/person-baptism.model';
import { PersonBaptismService } from './../../../../services/person-baptism.service';

@Component({
  selector: 'app-baptismal-form',
  templateUrl: './baptismal-form.component.html',
  styleUrls: ['./baptismal-form.component.scss']
})
export class BaptismalFormComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('person-id') personId;

  baptismalStatus = [
    { name: 'Baptised', value: 'Baptised' },
    { name: 'Not-Baptised', value: 'Not-Baptised' }
  ];

  baptism: PersonBaptism = {};
  subscription: Subscription;

  constructor(private personBaptismService: PersonBaptismService, private route: ActivatedRoute) { }

  ngOnInit() {

    if (this.personId) {
      this.subscription = this.personBaptismService.getPersonBaptism(this.personId)
        .subscribe(resp => {
          // tslint:disable-next-line:curly
          if (resp)
            return this.baptism = resp;

        });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async onBaptismalInfoSubmit() {
    // tslint:disable-next-line:curly
    if (confirm ('Are you sure of the record supplied?'))
      return await this.personBaptismService.updatePersonBaptism(this.personId, this.baptism);
  }

  clearBaptismFields() {
    this.baptism.baptisedBy = '';
    this.baptism.baptismalDate = null;
    this.baptism.churchBaptised = '';
    this.baptism.extraNotes = '';
  }
}
