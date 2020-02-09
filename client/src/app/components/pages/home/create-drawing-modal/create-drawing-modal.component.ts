import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { EditorParams } from 'src/app/components/pages/editor/editor/editor.component';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { ColorPickerComponent } from 'src/app/components/shared/color-picker/color-picker.component';

@Component({
  selector: 'app-create-drawing-modal',
  templateUrl: './create-drawing-modal.component.html',
  styleUrls: ['./create-drawing-modal.component.scss'],
})
export class CreateDrawingModalComponent extends AbstractModalComponent {
  @ViewChild('colorpicker', { static: true }) colorPicker: ColorPickerComponent;

  formGroup = new FormGroup({});
  width = '500';
  height = '500';

  constructor(private router: Router, public dialogRef: MatDialogRef<AbstractModalComponent>) {
    super(dialogRef);
  }

  onCreateClick() {
    const params: EditorParams = { width: this.width, height: this.height, color: this.colorPicker.color.hex };
    this.router.navigate(['edit', params]);
    this.dialogRef.close();
  }
}
