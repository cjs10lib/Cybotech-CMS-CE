import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-form',
  templateUrl: './other-form.component.html',
  styleUrls: ['./other-form.component.scss']
})
export class OtherFormComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('person-id') personId;

  constructor() { }

  ngOnInit() {}

}
