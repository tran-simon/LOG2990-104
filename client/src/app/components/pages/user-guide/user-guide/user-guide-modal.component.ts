import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MatSidenav } from '@angular/material/sidenav';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';

enum Subject {
  Welcome,
  Pen,
  Brush,
  Rectangle,
  Line,
  Color,
}

@Component({
  selector: 'app-user-guide-modal',
  templateUrl: './user-guide-modal.component.html',
  styleUrls: ['./user-guide-modal.component.scss'],
})
export class UserGuideModalComponent extends AbstractModalComponent implements OnInit {
  @ViewChild('sidenav', { static: false })
  sidenav: MatSidenav;
  subjects = Subject;
  selectedSubject: Subject;
  panelOpenState1 = false;

  constructor(public dialogRef: MatDialogRef<AbstractModalComponent>) {
    super(dialogRef);
  }

  ngOnInit(): void {
    this.selectedSubject = this.subjects.Welcome;
  }

  selectSubject(selection: Subject): void {
    this.selectedSubject = selection;
  }

  private openCategories(): void {
    this.panelOpenState1 = true;
  }

  previousSubject(): void {
    if (this.selectedSubject !== this.subjects.Welcome) {
      this.selectSubject(this.selectedSubject - 1);
      this.openCategories();
    }
  }

  nextSubject(): void {
    if (this.selectedSubject !== this.subjects.Color) {
      this.selectSubject(this.selectedSubject + 1);
      this.openCategories();
    }
  }
}
