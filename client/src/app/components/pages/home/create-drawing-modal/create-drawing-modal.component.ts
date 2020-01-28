import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AbstractModalComponent } from '../../../shared/abstract-modal/abstract-modal.component';

@Component({
    selector: 'app-create-drawing-modal',
    templateUrl: './create-drawing-modal.component.html',
    styleUrls: ['./create-drawing-modal.component.scss'],
})
export class CreateDrawingModalComponent extends AbstractModalComponent {
    formGroup: FormGroup = new FormGroup({});
    constructor(private router: Router, public dialogRef: MatDialogRef<AbstractModalComponent>) {
        super(dialogRef);
    }

    onCreateClick() {
        this.router.navigate(['edit', { ...this.formGroup.value }]).then(() => this.dialogRef.close());
    }
}
