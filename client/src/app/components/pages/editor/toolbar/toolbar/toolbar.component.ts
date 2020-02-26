import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatDrawer } from '@angular/material';
import { Router } from '@angular/router';

import { UserGuideModalComponent } from 'src/app/components/pages/user-guide/user-guide/user-guide-modal.component';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { ColorPickerComponent } from 'src/app/components/shared/color-picker/color-picker.component';
import { ToolType } from 'src/app/models/tools/tool';
import { SelectedColorType } from 'src/app/services/colors.service';
import { EditorService } from 'src/app/services/editor.service';
import { Color } from 'src/app/utils/color/color';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  static readonly TOOLBAR_WIDTH = 60;
  static readonly SLIDER_STEP = 0.1;

  @Input() stepThickness: number;

  @Input() currentToolType: ToolType;
  @Output() currentToolTypeChange = new EventEmitter<ToolType>();

  @Output() editorBackgroundChanged: EventEmitter<Color>;

  ToolType = ToolType;
  toolTypeKeys = Object.values(ToolType);

  selectedColor: SelectedColorType;
  SelectedColorType = SelectedColorType;

  showColorPicker: boolean;

  @ViewChild('drawer', { static: false })
  readonly drawer: MatDrawer;

  @ViewChild('colorPicker', { static: false })
  colorPicker: ColorPickerComponent;

  modalIsOpened: boolean;
  dialogRef: MatDialogRef<AbstractModalComponent>;

  readonly toolbarIcons: Map<ToolType, string>;

  constructor(private router: Router, public editorService: EditorService, public dialog: MatDialog) {
    this.stepThickness = ToolbarComponent.SLIDER_STEP;
    this.editorBackgroundChanged = new EventEmitter<Color>();
    this.showColorPicker = false;
    this.selectedColor = SelectedColorType.primary;
    this.modalIsOpened = false;

    this.toolbarIcons = new Map<ToolType, string>([
      [ToolType.Pen, 'edit'],
      [ToolType.Brush, 'brush'],
      [ToolType.Rectangle, 'crop_square'],
      [ToolType.Line, 'show_chart'],
      [ToolType.Ellipse, 'panorama_fish_eye'],
    ]);
  }

  handleColorChanged(eventColor: Color): void {
    this.color = eventColor;
    this.showColorPicker = false;
    this.drawer.close();
  }

  openModal(): void {
    if (!this.modalIsOpened) {
      this.dialogRef = this.dialog.open(UserGuideModalComponent, {});

      this.dialogRef.afterClosed().subscribe(() => {
        this.modalIsOpened = false;
      });
      this.modalIsOpened = true;
    }
  }

  selectTool(selection: ToolType): void {
    this.currentToolType = selection;
    this.showColorPicker = false;
    this.currentToolTypeChange.emit(selection);
  }

  editColor(selectedColorType: SelectedColorType): void {
    this.showColorPicker = true;
    this.drawer.open();
    this.selectedColor = selectedColorType;
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  updateBackground(color: Color): void {
    this.editorBackgroundChanged.emit(color);
  }

  get primaryColor(): Color {
    return this.editorService.colorsService.primaryColor;
  }

  get secondaryColor(): Color {
    return this.editorService.colorsService.secondaryColor;
  }

  set color(color: Color) {
    this.editorService.colorsService.setColorByType(color, this.selectedColor);
  }

  get color(): Color {
    return this.editorService.colorsService.getColor(this.selectedColor);
  }
}
