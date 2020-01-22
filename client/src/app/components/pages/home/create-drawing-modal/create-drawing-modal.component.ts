import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AbstractModalComponent } from '../../../shared/abstract-modal/abstract-modal.component';

@Component({
    selector: 'app-create-drawing-modal',
    templateUrl: './create-drawing-modal.component.html',
    styleUrls: ['./create-drawing-modal.component.scss'],
})
export class CreateDrawingModalComponent extends AbstractModalComponent {
    width = 0;
    height = 0;
    color = 0;

    constructor(private router: Router, public dialogRef: MatDialogRef<AbstractModalComponent>) {
        super(dialogRef);
    }

    onCreateClick() {
        const params = { width: this.width, height: this.height, color: this.color };
        this.router.navigate(['edit', { ...params }]).then(() => this.dialogRef.close());
    }
}
