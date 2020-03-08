import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { KeyboardListenerService } from 'src/app/services/event-listeners/keyboard-listener/keyboard-listener.service';
import { ModalDialogService, ModalTypes } from 'src/app/services/modal-dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [KeyboardListenerService]
})
export class HomeComponent {
  previousDrawings: boolean;
  modalIsOpened: boolean;
  guideModalType: ModalTypes;

  constructor(private router: Router, private dialog: ModalDialogService, private keyboardListener: KeyboardListenerService) {
    this.previousDrawings = false;
    this.modalIsOpened = false;
    this.guideModalType = ModalTypes.GUIDE;

    this.keyboardListener.addEvents([
      [
        KeyboardListenerService.getIdentifier('o', true),
        () => {
          this.openModal(ModalTypes.CREATE);
          return true;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('g', true),
        () => {
          this.openGallery();
          return true;
        },
      ],
    ]);
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
