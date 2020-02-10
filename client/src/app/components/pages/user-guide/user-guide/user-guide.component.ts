import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatSidenav } from '@angular/material';

import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';

enum Subject {
  Bienvenue,
  Sujet1,
  Sujet2,
  Sujet3,
  Sujet4,
  Sujet5,
  Sujet6,
}

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.scss'],
})
// todo rename to modal
export class UserGuideComponent extends AbstractModalComponent implements OnInit {
  @ViewChild('sidenav', { static: false })
  sidenav: MatSidenav;
  subjects = Subject;
  selectedSubject: Subject;
  opened = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  constructor(public dialogRef: MatDialogRef<AbstractModalComponent>) {
    super(dialogRef);
  }

  ngOnInit() {
    this.selectedSubject = this.subjects.Bienvenue;
  }

  selectSubject(selection: Subject) {
    this.selectedSubject = selection;
  }

  openCategories() {
    this.panelOpenState1 = true;
    this.panelOpenState2 = true;
    this.panelOpenState3 = true;
  }

  previousSubject() {
    if (this.selectedSubject !== this.subjects.Bienvenue) {
      this.selectSubject(this.selectedSubject - 1);
      this.openCategories();
    }
  }

  nextSubject() {
    if (this.selectedSubject !== this.subjects.Sujet6) {
      this.selectSubject(this.selectedSubject + 1);
      this.openCategories();
    }
  }
}
