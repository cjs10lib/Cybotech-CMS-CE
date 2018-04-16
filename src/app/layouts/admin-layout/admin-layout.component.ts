import { Component, OnInit, NgZone, ViewChild, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSidenavContainer } from '@angular/material';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
    pageTitle;

    // Sidenav responsive
    width;
    height;
    mode = 'side';
    open = 'true';

    // left sidenav
    leftOpen = 'false';

    title = 'Cybotech CMS';

    constructor(public ngZone: NgZone) {

        this.changeMode();
        window.onresize = (e) => {
            ngZone.run(() => {
                this.changeMode();
            });
        };
    }

    ngOnInit() {

    }

    changeMode() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        if (this.width <= 800) {
            this.mode = 'over';
            this.open = 'false';

            // left sidebar
            this.leftOpen = 'false';
        }
        if (this.width > 800) {
            this.mode = 'side';
            this.open = 'true';

            // left sidebar
            this.leftOpen = 'false';
        }
    }

}

