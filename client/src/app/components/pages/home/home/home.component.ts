import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { CreateDrawingModalComponent } from '../create-drawing-modal/create-drawing-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private keyboardEventHandler: KeyboardEventHandler;
  previousDrawings = false;
  modalIsOpened = false;

  constructor(private router: Router, private dialog: MatDialog) {
    this.keyboardEventHandler = {
      ctrl_o: () => {
        this.openCreateModal();
        return true;
      },
      ctrl_e: () => {
        return true;
      },
      ctrl_g: () => {
        return true;
      },
      ctrl_s: () => {
        return true;
      },
    } as KeyboardEventHandler;
  }

  openCreateModal(): void {
    if (!this.modalIsOpened) {
      this.dialog
        .open(CreateDrawingModalComponent, {})
        .afterClosed()
        .subscribe(() => {
          this.modalIsOpened = false;
        });
      this.modalIsOpened = true;
    }
  }

  openPage(nextLink: string): void {
    this.router.navigate([nextLink]);
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    KeyboardListener.keyEvent(event, this.keyboardEventHandler);
  }
}
