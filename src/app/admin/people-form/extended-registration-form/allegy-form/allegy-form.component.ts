import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { PersonAllegyService } from '../../../../services/person-allegy.service';

@Component({
  selector: 'app-allegy-form',
  templateUrl: './allegy-form.component.html',
  styleUrls: ['./allegy-form.component.scss']
})
export class AllegyFormComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:no-input-rename
  @Input('person-id') personId;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  allegies$: any[];

  subscription: Subscription;

  constructor(private personAllegyService: PersonAllegyService) { }

  ngOnInit() {
    this.subscription = this.personAllegyService.getAllegies(this.personId)
      .subscribe(resp => {
        this.allegies$ = resp;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async addAllegy(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.allegies$.splice(0, 0, value.trim());
      input.value = '';

      await this.personAllegyService.saveAllegy(this.personId, value.trim());
    }
  }

  async removeAllegy(allegy: any) {
    const index = this.allegies$.indexOf(allegy);

    if (index >= 0) {
      this.allegies$.splice(index, 1);

      await this.personAllegyService.deleteAllegy(this.personId, allegy['id']);
    }
  }

}
