import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { PersonDetails } from '../models/person-details.model';
import { Family } from './../models/person-family.model';

@Injectable()
export class PersonFamilyService {
  private familyCol: AngularFirestoreCollection<Family>;
  private families: Observable<Family[]>;

  constructor(private db: AngularFirestore) {
    this.familyCol = db.collection('families', ref => ref.orderBy('name'));

    this.families = this.familyCol.snapshotChanges()
    .map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Family;
        data.id = a.payload.doc.id;

        return data;
      });
    });
  }

  getFamilyMembers(familyId: string) {
    return this.db.collection('people', ref => ref.where('family.familyId', '==', familyId))
      .snapshotChanges().map(change => {
        return change.map(a => {
          const data = a.payload.doc.data() as PersonDetails;
          data.id = a.payload.doc.id;

          return data;
        });
      });
  }

  getFamilies() {
    return this.families;
  }

  addFamily(family: Family) {
    return this.db.collection('families')
      .add(family);
  }
}
