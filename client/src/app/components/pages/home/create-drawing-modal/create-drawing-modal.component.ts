import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AbstractModalComponent } from '../../../shared/abstract-modal/abstract-modal.component';
import {Color} from "../../../../utils/color/color";

@Component({
    selector: 'app-create-drawing-modal',
    templateUrl: './create-drawing-modal.component.html',
    styleUrls: ['./create-drawing-modal.component.scss'],
})
export class CreateDrawingModalComponent extends AbstractModalComponent {
  formGroup = new FormGroup({});
    width = "500";
    height = "500";
    color = Color.WHITE;
    constructor(private router: Router, public dialogRef: MatDialogRef<AbstractModalComponent>) {
        super(dialogRef);
    }

    onCreateClick() {
        this.router.navigate(['edit',
          {width: this.width, height: this.height,color: this.color.hex}
          ]).then(() => this.dialogRef.close());
    }
}
