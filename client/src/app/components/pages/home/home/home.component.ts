import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { EditorParams } from '@components/pages/editor/editor/editor-params';
import { LocalSaveService } from '@services/localsave.service';
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

  constructor(
    private router: Router,
    private dialog: ModalDialogService,
    private keyboardListener: KeyboardListenerService,
    private localSaveService: LocalSaveService,
  ) {
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

  continueDrawing(): void {
    const params: EditorParams = {
      width: this.localSaveService.drawing.width.toString(),
      height: this.localSaveService.drawing.height.toString(),
      color: this.localSaveService.drawing.color,
      id: LocalSaveService.LOCAL_DRAWING_ID,
    };
    this.router.navigate(['/'], { skipLocationChange: true }).then(() => this.router.navigate(['edit', params]));
  }

  get isDrawingNull(): boolean {
    return this.localSaveService.drawing == null;
  }
}
