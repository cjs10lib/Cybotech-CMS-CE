import 'rxjs/add/observable/fromPromise';

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { PersonDetails } from '../models/person-details.model';
import { Person } from './../models/person.model';
import { RegistrationImageService } from './registration-image.service';
import { PersonFamily } from '../models/person-family.model';

@Injectable()
export class PeopleService {
  private peopleCollection: AngularFirestoreCollection<PersonDetails>;
  private personDocument: AngularFirestoreDocument<PersonDetails>;
  private people: Observable<PersonDetails[]>;

  constructor(private db: AngularFirestore, private imageService: RegistrationImageService) {
    this.peopleCollection = db.collection('people');

    this.people = this.peopleCollection.snapshotChanges()
      .map(change => {
        return change.map(a => {
          const data = a.payload.doc.data() as PersonDetails;
          data.id = a.payload.doc.id;

          return data;
        });
      });
  }

  private addPerson(person: Person, path?: string, downloadUrl?: string) {
    return this.db.collection('people').add({
      person: person,
      imageURL: downloadUrl ? downloadUrl : '',
      imagePath: path ? path : '',
      createdDate: new Date().getTime()
    });
  }

  getPeople() {
    return this.people;
  }

  getPerson(personId: string) {
    return this.db.doc(`people/${personId}`).valueChanges();
  }

  async createPerson(person: Person, fileToUpload?: File) {
    if (fileToUpload == null) {
      return this.addPerson(person);
    } else {
      const imageUpload = await this.imageService.pushImageUpload(person, fileToUpload);
      return this.addPerson(person, imageUpload.path, imageUpload.downloadURL);
    }
  }

  async updatePerson (personId: string, details: PersonDetails, fileToUpload?: File) {
    if (fileToUpload == null) {
      return this.db.doc(`people/${personId}`).set(details, {merge: true});
    } else {
      const imageUpload = await this.imageService.pushImageUpload(details.person, fileToUpload);
      return this.db.doc(`people/${personId}`)
        .set({
          imageURL: imageUpload.downloadURL,
          imagePath: imageUpload.path,
          person: details.person
        }, {merge: true});
    }
  }

  updatePersonFamily(personId: string, details: PersonFamily) {
    return this.db.doc(`people/${personId}`)
      .set({
        family: details
    }, {merge: true});
  }
}
