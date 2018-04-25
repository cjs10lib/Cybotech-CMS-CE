import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { PersonBaptism } from '../models/person-baptism.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PersonBaptismService {

  constructor(private db: AngularFirestore) { }

  updatePersonBaptism(personId: string, baptism: PersonBaptism) {
    return this.db.collection('baptism')
      .doc(personId).set(baptism);
  }

  getPersonBaptism(personId: string): Observable<PersonBaptism> {
    return this.db.doc(`baptism/${personId}`).valueChanges();
  }
}
