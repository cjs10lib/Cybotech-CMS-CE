import { Observable } from 'rxjs/Observable';

import { PeopleService } from './../../services/people.service';
import { Person } from './../../models/person.model';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.scss']
})
export class PeopleFormComponent implements OnInit {
  step = 0;

  person: Person = {
    education: {},
    occupation: {},
    contact: {}
  };

  // Breadcrum
  title = 'New Registration';
  icon = 'person_add';
  pageBanner = 'url(\'../../assets/banner/banner 1.jpg\')';

  // image preview
  imageUrl = '../../assets/avatar/avatar3.png';
  fileToUpload: File = null;
  // tslint:disable-next-line:no-inferrable-types
  isHovering: boolean;

  constructor(public peopleService: PeopleService) { }

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
    if (confirm('Are you sure of this record?')) {
      this.peopleService.createPerson(this.person, this.fileToUpload);
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


