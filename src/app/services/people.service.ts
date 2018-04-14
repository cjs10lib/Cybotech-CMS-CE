import { Person } from './../models/person.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class PeopleService {
  private peopleCollection: AngularFirestoreCollection<Person>;
  private personDocument: AngularFirestoreDocument<Person>;
  private people: Observable<Person[]>;

  // Main upload task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;

  downloadURL: Observable<string>;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
    this.peopleCollection = db.collection('people',
      ref => ref.orderBy('name'));

    this.people = this.peopleCollection.snapshotChanges()
      .map(change => {
        return change.map(a => {
          const data = a.payload.doc.data() as Person;
          data.id = a.payload.doc.id;

          return data;
        });
      });
  }

  getPeople() {
    return this.people;
  }

  private addPerson(person: Person, path: string) {
    return this.db.collection('people').add({
      person,
      imageURL: path,
      createdDate: new Date().getTime()
    });
  }

  private imagePath(firstname: string) {
    return `Images/${new Date().getTime()}_${firstname}`;
  }

  createPerson(person: Person, fileToUpload: File) {

    if (fileToUpload.type.split('/')[0] !== 'image') {
      console.log('unsupported file type :( ');
    }

    const path = this.imagePath(person.firstname);
    const customMetadata = { app: 'Cybotech-CMS CE!' };
    this.task = this.storage.upload(path, fileToUpload, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    // Update firestore on completion
    this.addPerson(person, path);

    // File's download URL
    this.downloadURL =  this.task.downloadURL();
  }

}
