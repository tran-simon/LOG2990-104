import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AbstractModalComponent } from '../../../shared/abstract-modal/abstract-modal.component';

@Component({
    selector: 'app-create-drawing-modal',
    templateUrl: './create-drawing-modal.component.html',
    styleUrls: ['./create-drawing-modal.component.scss'],
})
export class CreateDrawingModalComponent extends AbstractModalComponent {
    constructor(dialogRef: MatDialogRef<AbstractModalComponent>) {
        super(dialogRef);
    }
}
