import { AfterViewInit, ChangeDetectorRef, Component, HostListener, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { EditorParams } from 'src/app/components/pages/editor/editor/editor.component';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar.component';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { ColorPickerComponent } from 'src/app/components/shared/color-picker/color-picker.component';

@Component({
  selector: 'app-create-drawing-modal',
  templateUrl: './create-drawing-modal.component.html',
  styleUrls: ['./create-drawing-modal.component.scss'],
})
export class CreateDrawingModalComponent extends AbstractModalComponent implements AfterViewInit {
  @ViewChild('colorpicker', { static: true }) colorPicker: ColorPickerComponent;
  formGroup = new FormGroup({});
  private windowWidth = 500;
  private windowHeight = 500;
  width = this.windowWidth.toString();
  height = this.windowHeight.toString();

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<AbstractModalComponent>,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super(dialogRef);
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.width === this.windowWidth.toString() && this.height === this.windowHeight.toString()) {
      this.windowWidth = window.innerWidth - ToolbarComponent.TOOLBAR_WIDTH;
      this.windowHeight = window.innerHeight;

      this.width = this.windowWidth.toString();
      this.height = this.windowHeight.toString();
      this.changeDetectorRef.detectChanges();
    }
  }

  onCreateClick() {
    const params: EditorParams = { width: this.width, height: this.height, color: this.colorPicker.color.hex };
    this.router.navigate(['edit', params]);
    this.dialogRef.close();
  }
}
