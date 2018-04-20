import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

import { Person } from '../models/person.model';

@Injectable()
export class RegistrationImageService {
  basePath = 'Images';
  storageRef = this.storage;

  private percentage: Observable<number>;
  private snapshot: Observable<any>;

  constructor(private storage: AngularFireStorage) { }

  private uploadPath(firstname: string) {
    return `${this.basePath}/${new Date().getTime()}_${firstname}`;
  }

  async pushImageUpload(person: Person, fileToUpload: File) {
    const path = this.uploadPath(person.firstname);
    const customMetadata = { app: 'Cybotech-CMS CE!' };
    const uploadTask = this.storageRef.upload(path, fileToUpload, { customMetadata: customMetadata});

    this.percentage = uploadTask.percentageChanges();
    this.snapshot = uploadTask.snapshotChanges();

    const downloadURL = await uploadTask.downloadURL().toPromise();

    return { path: path, downloadURL: downloadURL };
  }

  deleteImageUpload(imagePath: string) {
    return this.storageRef.ref(imagePath).delete();
  }
}
