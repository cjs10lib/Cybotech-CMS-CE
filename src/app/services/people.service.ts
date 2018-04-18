import { Person, PersonDetails } from './../models/person.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import * as firebase from 'firebase';
import { isUndefined } from 'util';

@Injectable()
export class PeopleService {
  private peopleCollection: AngularFirestoreCollection<PersonDetails>;
  private personDocument: AngularFirestoreDocument<PersonDetails>;
  private people: Observable<PersonDetails[]>;

  // Main upload task
  private task: AngularFireUploadTask;

  // Progress monitoring
  private percentage: Observable<number>;
  private snapshot: Observable<any>;

  private downloadURL: string;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    // this.peopleCollection = db.collection('people', ref => ref.orderBy('name'));
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

  private imagePath(firstname: string) {
    return `Images/${new Date().getTime()}_${firstname}`;
  }

  private addPerson(person: Person, path?: string, downloadUrl?: string) {
    return this.db.collection('people').add({
      person: person,
      imageURL: downloadUrl ? this.downloadURL : '',
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

    // tslint:disable-next-line:curly
    if (fileToUpload == null)
      return this.addPerson(person);

    // tslint:disable-next-line:curly
    if (fileToUpload.type.split('/')[0] !== 'image')
    console.log('unsupported file type :( ');

    const path = this.imagePath(person.firstname);
    const customMetadata = { app: 'Cybotech-CMS CE!' };
    this.task = this.storage.upload(path, fileToUpload, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    // File's download URL
    const url = await this.task.downloadURL().toPromise();
    this.downloadURL = url;

    return this.addPerson(person, path, url);
  }
}
