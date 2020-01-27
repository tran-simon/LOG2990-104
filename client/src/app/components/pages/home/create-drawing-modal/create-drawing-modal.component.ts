import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AbstractModalComponent } from '../../../shared/abstract-modal/abstract-modal.component';
import { NumberFormComponent } from '../../../shared/forms/number-form/number-form.component';

@Component({
    selector: 'app-create-drawing-modal',
    templateUrl: './create-drawing-modal.component.html',
    styleUrls: ['./create-drawing-modal.component.scss'],
})
export class CreateDrawingModalComponent extends AbstractModalComponent {
    @ViewChild('widthForm', { static: false }) widthForm: NumberFormComponent;
    @ViewChild('heightForm', { static: false }) heightForm: NumberFormComponent;
    @ViewChild('colorForm', { static: false }) colorForm: NumberFormComponent;

    constructor(private router: Router, public dialogRef: MatDialogRef<AbstractModalComponent>) {
        super(dialogRef);
    }

    onCreateClick() {
        const params = { width: this.widthForm.number, height: this.heightForm.number, color: this.colorForm.number };
        this.router.navigate(['edit', { ...params }]).then(() => this.dialogRef.close());
    }
}
