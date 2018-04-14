import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.scss']
})
export class PeopleFormComponent implements OnInit {
  step = 0;

  person = {};

  title = 'New Registration';
  icon = 'person_add';
  pageBanner = 'url(\'../../assets/banner/banner 1.jpg\')';

  imageUrl = '../../assets/avatar/avatar3.png';
  fileToUpload: File = null;
  // tslint:disable-next-line:no-inferrable-types
  isHovering: boolean;

  constructor() { }

  ngOnInit() {
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

  onSubmit() {
    console.log(this.person);
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

  toggleHover($event: boolean) {
    this.isHovering = $event;
  }

}
