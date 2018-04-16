import { Component, OnInit } from '@angular/core';
import { Person } from '../../../models/person.model';
import { PeopleService } from '../../../services/people.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-registration-form',
  templateUrl: './basic-registration-form.component.html',
  styleUrls: ['./basic-registration-form.component.scss']
})
export class BasicRegistrationFormComponent implements OnInit {
  step = 0;

  person: Person = {
    education: {},
    occupation: {},
    contact: {}
  };

   // image preview
   imageUrl = '../../assets/avatar/avatar3.png';
   fileToUpload: File = null;
   // tslint:disable-next-line:no-inferrable-types
   isHovering: boolean;

  constructor(public peopleService: PeopleService, private router: Router) { }

  ngOnInit() {
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

  onSubmit(person: Person) {

    let personId;

    if (confirm('Are you sure of this record?')) {
      this.peopleService.createPerson(this.person, this.fileToUpload)
        .then(resp => {
          personId = resp.id;


          console.log(personId);
          // route to profile
          // tslint:disable-next-line:curly
          if (personId)
            this.router.navigate(['profile', personId]);
        });
    }
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
