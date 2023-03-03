import { Component,ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatTab, MatTabNav } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild(MatTabNav) tabBar : MatTabNav;
  studentData = [];

  constructor(private router: Router, public cdr: ChangeDetectorRef) {
  }

  isLinkActive(label: string) {
    switch(label) {
      case 'home':
        if(this.router.url == '/') return true;
        break;
      case 'enrol':
        if(this.router.url == '/enrol') return true;
        break;
    }
  }
}
