import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDialogService, ModalTypes } from 'src/app/services/modal-dialog.service';
import { KeyboardEventAction, KeyboardListener } from 'src/app/utils/events/keyboard-listener';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly keyboardListener: KeyboardListener;
  previousDrawings: boolean;
  modalIsOpened: boolean;
  guideModalType: ModalTypes;

  constructor(private router: Router, private dialog: ModalDialogService) {
    this.previousDrawings = false;
    this.modalIsOpened = false;
    this.guideModalType = ModalTypes.GUIDE;

    this.keyboardListener = new KeyboardListener(
      new Map<string, KeyboardEventAction>([
        [
          KeyboardListener.getIdentifier('o', true),
          () => {
            this.openModal(ModalTypes.CREATE);
            return true;
          },
        ],
        [
          KeyboardListener.getIdentifier('g', true),
          () => {
            this.openGallery();
            return true;
          },
        ],
      ]),
    );
  }

  openModal(link: ModalTypes = ModalTypes.CREATE): void {
    this.dialog.openByName(link);
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
