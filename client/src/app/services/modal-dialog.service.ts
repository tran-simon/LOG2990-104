import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateDrawingModalComponent } from 'src/app/components/pages/home/create-drawing-modal/create-drawing-modal.component';
import { UserGuideModalComponent } from 'src/app/components/pages/user-guide/user-guide/user-guide-modal.component';

export enum ModalTypes {
  CREATE = 'create',
  GUIDE = 'help',
}
@Injectable({
  providedIn: 'root'
})
export class ModalDialogService extends MatDialog {

  openByName(dialogName: ModalTypes): void {
    if (!this.modalIsOpened) {
      switch (dialogName) {
        case ModalTypes.CREATE:
          this.open(CreateDrawingModalComponent, {});
          break;
        case ModalTypes.GUIDE:
          this.open(UserGuideModalComponent, {});
          break;
        default:
          return;
      }
    }
  }

  get modalIsOpened(): boolean {
    return this.openDialogs.length !== 0;
  }
}
