import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import {
  ChooseExportSaveModalComponent
} from 'src/app/components/pages/choose-export-save/choose-export-save/choose-export-save-modal.component';
import { ExportModalComponent } from 'src/app/components/pages/export-modal/export-modal/export-modal.component';
import { CreateDrawingModalComponent } from 'src/app/components/pages/home/create-drawing-modal/create-drawing-modal.component';
import { SaveDrawingModalComponent } from 'src/app/components/pages/save-drawing/save-drawing/save-drawing-modal.component';
import { UserGuideModalComponent } from 'src/app/components/pages/user-guide/user-guide/user-guide-modal.component';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { ConfirmModalComponent } from 'src/app/components/shared/abstract-modal/confirm-modal/confirm-modal/confirm-modal.component';

export enum ModalTypes {
  CREATE = 'create',
  GUIDE = 'help',
  CONFIRM = 'confirm',
  SAVE = 'save',
  EXPORT = 'export',
  CHOOSE_EXPORT_SAVE = 'choose-export-save'
}

@Injectable({
  providedIn: 'root',
})
export class ModalDialogService extends MatDialog {
  openByName(dialogName: ModalTypes): MatDialogRef<AbstractModalComponent> | null {
    if (!this.modalIsOpened) {
      switch (dialogName) {
        case ModalTypes.CREATE:
          return this.open(CreateDrawingModalComponent, {});
        case ModalTypes.GUIDE:
          return this.open(UserGuideModalComponent, {});
        case ModalTypes.CONFIRM:
          return this.open(ConfirmModalComponent, {});
        case ModalTypes.SAVE:
          return this.open(SaveDrawingModalComponent, {});
        case ModalTypes.EXPORT:
          return this.open(ExportModalComponent, {});
        case ModalTypes.CHOOSE_EXPORT_SAVE:
          return this.open(ChooseExportSaveModalComponent, {});
      }
    }
    return null;
  }

  get modalIsOpened(): boolean {
    return this.openDialogs.length !== 0;
  }
}
