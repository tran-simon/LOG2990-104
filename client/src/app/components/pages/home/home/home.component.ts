import { Component, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { CreateDrawingModalComponent } from '../create-drawing-modal/create-drawing-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  keyboardEventHandler: KeyboardEventHandler;
  previousDrawings = false;
  modalIsOpened = false;
  dialogRef: MatDialogRef<AbstractModalComponent>;

  constructor(private router: Router, public dialog: MatDialog) {
    this.keyboardEventHandler = {
      ctrl_o: () => {
        this.openCreateModal();
        return true;
      },
      ctrl_g: () => {
        this.openGallery();
        return true;
      },
    } as KeyboardEventHandler;
  }

  openCreateModal(): void {
    if (!this.modalIsOpened) {
      this.dialogRef = this.dialog.open(CreateDrawingModalComponent, {});

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
    KeyboardListener.keyEvent(event, this.keyboardEventHandler);
  }
}
