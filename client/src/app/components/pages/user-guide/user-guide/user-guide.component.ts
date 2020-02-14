import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MatSidenav } from '@angular/material/sidenav';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';

enum Subject {
  Bienvenue,
  Crayon,
  Pinceau,
  Rectangle,
  Ligne,
  Couleur,
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

  constructor(public dialogRef: MatDialogRef<AbstractModalComponent>) {
    super(dialogRef);
  }

  ngOnInit(): void {
    this.selectedSubject = this.subjects.Bienvenue;
  }

  selectSubject(selection: Subject): void {
    this.selectedSubject = selection;
  }

  private openCategories(): void {
    this.panelOpenState1 = true;
  }

  previousSubject(): void {
    if (this.selectedSubject !== this.subjects.Bienvenue) {
      this.selectSubject(this.selectedSubject - 1);
      this.openCategories();
    }
  }

  nextSubject(): void {
    if (this.selectedSubject !== this.subjects.Couleur) {
      this.selectSubject(this.selectedSubject + 1);
      this.openCategories();
    }
  }
}
