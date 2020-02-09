import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { EditorParams } from 'src/app/components/pages/editor/editor/editor.component';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar.component';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { ColorPickerComponent } from 'src/app/components/shared/color-picker/color-picker.component';
import { Color } from 'src/app/utils/color/color';

@Component({
  selector: 'app-create-drawing-modal',
  templateUrl: './create-drawing-modal.component.html',
  styleUrls: ['./create-drawing-modal.component.scss'],
})
export class CreateDrawingModalComponent extends AbstractModalComponent implements AfterViewInit {
  @ViewChild('colorpicker', { static: true }) colorPicker: ColorPickerComponent;
  formGroup = new FormGroup({});
  width = '500';
  height = '500';

  constructor(private router: Router, public dialogRef: MatDialogRef<AbstractModalComponent>) {
    super(dialogRef);
  }

  ngAfterViewInit(): void {
    this.colorPicker.color = Color.WHITE;
    this.width = (window.innerWidth - ToolbarComponent.TOOLBAR_WIDTH).toString();
    this.height = window.innerHeight.toString();
  }

  @HostListener('window:resize')
  onResize(): void {
    // todo: dont update if user changed value. Remove duplicate code
    this.width = (window.innerWidth - ToolbarComponent.TOOLBAR_WIDTH).toString();
    this.height = window.innerHeight.toString();
  }

  onCreateClick() {
    const params: EditorParams = { width: this.width, height: this.height, color: this.colorPicker.color.hex };
    this.router.navigate(['edit', params]).then(() => this.dialogRef.close());
  }
}
