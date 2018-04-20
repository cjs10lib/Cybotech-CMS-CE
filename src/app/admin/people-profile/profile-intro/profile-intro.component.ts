import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-intro',
  templateUrl: './profile-intro.component.html',
  styleUrls: ['./profile-intro.component.scss']
})
export class ProfileIntroComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('person-profile') details = {};

  // tslint:disable-next-line:no-input-rename
  // @Input('person-image') personImage;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  editProfile() {
    const id = this.route.snapshot.paramMap.get('id');

    this.router.navigate(['registration', id ]);
  }
}
