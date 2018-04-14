import { Component, OnInit, Input, NgZone } from '@angular/core';

@Component({
  selector: 'app-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss']
})
export class BreadcrumComponent {

  // tslint:disable-next-line:no-input-rename
  @Input('page-title') pageTitle: string;

  // tslint:disable-next-line:no-input-rename
  @Input('page-icon') pageIcon: string;

  // tslint:disable-next-line:no-input-rename
  @Input('page-banner') pageBanner: string;

  constructor() { }

}
