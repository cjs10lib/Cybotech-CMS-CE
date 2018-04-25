import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PersonDietaryNeedsService {

  dietaryCol: AngularFirestoreCollection<PersonDietaryNeed>;
  dietaryNeeds: Observable<PersonDietaryNeed[]>;

  constructor(private db: AngularFirestore) {}

  getDietaries(personId: string) {
    this.dietaryCol = this.db.collection('dietaries', ref => ref.where('personId', '==', personId));

    return this.dietaryNeeds = this.dietaryCol.snapshotChanges()
      .map(change => {
        return change.map(a => {
          const data = a.payload.doc.data() as PersonDietaryNeed;
          data.id = a.payload.doc.id;

          return data;
        });
      });
  }

  saveDietaryNeed(personId: string, dietaryNeed) {
    return this.db.collection(`dietaries`).add({
      personId: personId,
      dietaryNeed: dietaryNeed,
      createdDate: new Date().getTime()
    });
  }

  deleteDietaryNeed(personId: string, dietaryId: string) {
    return this.db.doc(`dietaries/${dietaryId}`).delete();
  }
}

interface PersonDietaryNeed {
  id?: string;
  name?: string;
  createdDate?: Date;
}
