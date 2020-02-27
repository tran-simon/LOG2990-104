import { Component, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { UserGuideModalComponent } from 'src/app/components/pages/user-guide/user-guide/user-guide-modal.component';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { KeyboardEventAction, KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { CreateDrawingModalComponent } from '../create-drawing-modal/create-drawing-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly keyboardListener: KeyboardListener;
  previousDrawings: boolean;
  modalIsOpened: boolean;
  dialogRef: MatDialogRef<AbstractModalComponent>;

  constructor(private router: Router, public dialog: MatDialog) {
    this.previousDrawings = false;
    this.modalIsOpened = false;

    this.keyboardListener = new KeyboardListener(new Map<string, KeyboardEventAction>([
      [KeyboardListener.getIdentifier('o', true), () => {
        this.openModal('create');
        return true;
      }],
      [KeyboardListener.getIdentifier('g', true), () => {
        this.openGallery();
        return true;
      }]
    ]));
  }

  openModal(link = 'create'): void {
    if (!this.modalIsOpened) {
      switch (link) {
        case 'create':
          this.dialogRef = this.dialog.open(CreateDrawingModalComponent, {});
          break;
        case 'help':
          this.dialogRef = this.dialog.open(UserGuideModalComponent, {});
          break;
        default:
          return;
      }

      this.dialogRef.afterClosed().subscribe(() => {
        this.modalIsOpened = false;
      });
      this.modalIsOpened = true;
    }
  }

  openPage(nextLink: string): void {
    this.router.navigate([nextLink]);
  }

  openGallery(): void {
    return;
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    this.keyboardListener.handle(event);
  }
}
