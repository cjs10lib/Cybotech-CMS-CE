import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class ResponsiveLayoutService {

  private width;
  private height;
  private size;

  constructor(public ngZone: NgZone) {

    this.getScreenSize();
    window.onresize = (e) => {
        ngZone.run(() => {
            this.getScreenSize();
        });
    };
  }

  getScreenSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    if (this.width <= 800) {
      return this.size = 'sm';
    }
    if (this.width > 800) {
      return this.size = 'lg';
    }
  }
}
