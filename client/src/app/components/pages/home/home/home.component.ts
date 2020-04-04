import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { KeyboardListenerService } from 'src/app/services/event-listeners/keyboard-listener/keyboard-listener.service';
import { ModalDialogService } from 'src/app/services/modal/modal-dialog.service';
import { ModalType } from 'src/app/services/modal/modal-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [KeyboardListenerService],
})
export class HomeComponent {
  previousDrawings: boolean;
  modalIsOpened: boolean;
  guideModalType: ModalType;

  constructor(private router: Router, private dialog: ModalDialogService, private keyboardListener: KeyboardListenerService) {
    this.previousDrawings = false;
    this.modalIsOpened = false;
    this.guideModalType = ModalType.GUIDE;

    this.keyboardListener.addEvents([
      [
        KeyboardListenerService.getIdentifier('o', true),
        () => {
          this.openModal(ModalType.CREATE);
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

  openModal(link: ModalType = ModalType.CREATE): void {
    this.dialog.openByName(link);
  }

  openPage(nextLink: string): void {
    this.router.navigate([nextLink]);
  }

  openGallery(): void {
    this.dialog.openByName(ModalType.GALLERY);
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    this.keyboardListener.handle(event);
  }
}
