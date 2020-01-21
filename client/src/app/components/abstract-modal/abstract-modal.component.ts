import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-abstract-modal',
    templateUrl: './abstract-modal.component.html',
    styleUrls: ['./abstract-modal.component.scss'],
})
export class AbstractModalComponent {
    constructor(public dialogRef: MatDialogRef<AbstractModalComponent>) {}

    onCloseClick() {
        this.dialogRef.close();
    }
}
