import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PersonDetails } from '../../../models/person-details.model';
import { Person } from '../../../models/person.model';
import { PeopleService } from '../../../services/people.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';

@Component({
  selector: 'app-basic-registration-form',
  templateUrl: './basic-registration-form.component.html',
  styleUrls: ['./basic-registration-form.component.scss']
})
export class BasicRegistrationFormComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('person-id') personId;

  step = 0;

  fullname;

  person: Person = {
    education: {},
    occupation: {},
    contact: {}
  };

  details: PersonDetails = {
    person: {
      education: {},
      occupation: {},
      contact: {}
    }
  };

  imageUrl = '../../assets/avatar/avatar3.png';
  fileToUpload: File = null;
  isHovering: boolean;

  constructor(
    private peopleService: PeopleService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: SweetAlertService
  ) {}

  ngOnInit() {
    if (this.personId) {
      this.peopleService.getPerson(this.personId)
        .take(1).subscribe(resp => {
          this.person = resp['person'];
          this.details = resp;

          this.imageUrl = resp['imageURL'];
        });
    }
  }

  toggleHover($event: boolean) {
    this.isHovering = $event;
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    if (this.fileToUpload.type.split('/')[0] !== 'image') {
      console.log('unsupported file type :( ');
    }

    // show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  async onSubmit(person: Person) {
    this.alertService.confirmUpdate()
    .then(result => {
      // tslint:disable-next-line:curly
      if (!result.value)
        return;

      // adds fullname
      this.person.fullname = this.person.surname + ' ' + this.person.firstname + ' ' + this.person.otherNames;
      if (this.personId) {
        this.confirmUpdate();
      } else {
        this.confirmCreate();
      }
      this.alertService.afterUpdateSucess();
    });
  }

  private confirmCreate() {
    this.peopleService.createPerson(this.person, this.fileToUpload)
      .then(resp => {
        const personId = resp.id;

        console.log(this.person.firstname);

        // tslint:disable-next-line:curly
        if (personId)
          return this.router.navigate(['profile', personId]);

        // navigate to people
        this.router.navigate(['people']);
      });
  }

  private async confirmUpdate() {
    await this.peopleService.updatePerson(this.personId, this.details, this.fileToUpload);
    this.router.navigate(['profile', this.personId]);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
