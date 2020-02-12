import { Component, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { UserGuideComponent } from 'src/app/components/pages/user-guide/user-guide/user-guide.component';
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
        this.openModal('create');
        return true;
      },
      ctrl_g: () => {
        this.openGallery();
        return true;
      },
    } as KeyboardEventHandler;
  }

  openModal(link = 'create'): void {
    if (!this.modalIsOpened) {
      switch (link) {
        case 'create':
          this.dialogRef = this.dialog.open(CreateDrawingModalComponent, {});
          break;
        case 'help':
          this.dialogRef = this.dialog.open(UserGuideComponent, {});
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
    KeyboardListener.keyEvent(event, this.keyboardEventHandler);
  }
}
