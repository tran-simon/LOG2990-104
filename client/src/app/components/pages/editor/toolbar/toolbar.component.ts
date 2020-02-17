import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatDrawer } from '@angular/material';
import { Router } from '@angular/router';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { ColorPickerComponent } from 'src/app/components/shared/color-picker/color-picker.component';
import { SelectedColorsService, SelectedColorType } from 'src/app/services/selected-colors.service';
import { Color } from 'src/app/utils/color/color';

import { UserGuideModalComponent } from 'src/app/components/pages/user-guide/user-guide/user-guide-modal.component';
import { BrushToolProperties } from '../../../../models/tool-properties/brush-tool-properties';
import { LineToolProperties } from '../../../../models/tool-properties/line-tool-properties';
import { PenToolProperties } from '../../../../models/tool-properties/pen-tool-properties';
import { RectangleToolProperties } from '../../../../models/tool-properties/rectangle-tool-properties';
import { ToolProperties } from '../../../../models/tool-properties/tool-properties';

enum Tool {
  Pen = 'Pen',
  Brush = 'Brush',
  Rectangle = 'Rectangle',
  Line = 'Line',
  ColorPicker = 'ColorPicker',
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  static readonly TOOLBAR_WIDTH = 60;
  static readonly SLIDER_STEP = 0.1;

  @Input() stepThickness: number;
  @Output() toolChanged: EventEmitter<ToolProperties>;
  @Output() editorBackgroundChanged: EventEmitter<Color>;

  tools = Tool;
  currentTool: Tool;

  selectedColor: SelectedColorType;
  SelectedColorType = SelectedColorType;

  showColorPicker: boolean;

  @ViewChild('drawer', { static: false })
  drawer: MatDrawer;

  @ViewChild('colorPicker', { static: false })
  colorPicker: ColorPickerComponent;

  penProperties: PenToolProperties;
  brushProperties: BrushToolProperties;
  rectangleProperties: RectangleToolProperties;

  lineProperties: LineToolProperties;
  modalIsOpened: boolean;
  dialogRef: MatDialogRef<AbstractModalComponent>;

  constructor(private router: Router, public selectedColors: SelectedColorsService, public dialog: MatDialog) {
    this.stepThickness = ToolbarComponent.SLIDER_STEP;
    this.toolChanged = new EventEmitter<ToolProperties>();
    this.editorBackgroundChanged = new EventEmitter<Color>();
    this.showColorPicker = false;
    this.penProperties = new PenToolProperties();
    this.brushProperties = new BrushToolProperties();
    this.rectangleProperties = new RectangleToolProperties();
    this.lineProperties = new LineToolProperties();
    this.selectedColor = SelectedColorType.primary;
    this.currentTool = this.tools.Pen;
    this.modalIsOpened = false;
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

  selectTool(selection: Tool): void {
    this.currentTool = selection;
    this.showColorPicker = false;

    switch (this.currentTool) {
      case this.tools.Pen:
        this.toolChanged.emit(this.penProperties);
        break;
      case this.tools.Brush:
        this.toolChanged.emit(this.brushProperties);
        break;
      case this.tools.Rectangle:
        this.toolChanged.emit(this.rectangleProperties);
        break;
      case this.tools.Line:
        this.toolChanged.emit(this.lineProperties);
        break;
    }
  }

  openPanel(selection: Tool): void {
    if (this.currentTool === selection) {
      this.drawer.toggle();
      this.showColorPicker = false;
    } else {
      this.currentTool = selection;
      this.drawer.open();
    }
  }

  selectColor(index: number): void {
    this.showColorPicker = true;
    this.drawer.open();
    this.selectedColor = index;
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  updateBackground(color: Color): void {
    this.editorBackgroundChanged.emit(color);
  }

  get primaryColor(): Color {
    return this.selectedColors.primaryColor;
  }

  get secondaryColor(): Color {
    return this.selectedColors.secondaryColor;
  }

  set color(color: Color) {
    this.selectedColors.setColorByIndex(color, this.selectedColor);
  }

  get color(): Color {
    return this.selectedColors.colorByIndex(this.selectedColor);
  }
}
