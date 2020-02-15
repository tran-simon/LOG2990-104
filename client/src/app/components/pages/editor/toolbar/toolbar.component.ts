import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatDrawer } from '@angular/material';
import { Router } from '@angular/router';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { ColorPickerComponent } from 'src/app/components/shared/color-picker/color-picker.component';
import { SelectedColorsService, SelectedColorType } from 'src/app/services/selected-colors.service';
import { Color } from 'src/app/utils/color/color';

import { UserGuideComponent } from 'src/app/components/pages/user-guide/user-guide/user-guide.component';
import { BrushTextureType, BrushToolProperties } from '../../../../models/tool-properties/brush-tool-properties';
import { LineJunctionType, LineToolProperties } from '../../../../models/tool-properties/line-tool-properties';
import { PenToolProperties } from '../../../../models/tool-properties/pen-tool-properties';
import { RectangleContourType, RectangleToolProperties } from '../../../../models/tool-properties/rectangle-tool-properties';
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

  brushTextureNames = Object.values(BrushTextureType);

  rectangleContourTypes = RectangleContourType;
  rectangleContourNames = Object.values(this.rectangleContourTypes);

  lineJunctionTypes = LineJunctionType;
  lineJunctionNames = Object.values(this.lineJunctionTypes);

  showColorPicker: boolean;

  private _alpha: number;

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
    this.rectangleContourTypes = RectangleContourType;
    this.rectangleContourNames = Object.values(this.rectangleContourTypes);
    this.lineJunctionTypes = LineJunctionType;
    this.lineJunctionNames = Object.values(this.lineJunctionTypes);
    this.showColorPicker = false;
    this._alpha = 1;
    this.penProperties = new PenToolProperties();
    this.brushProperties = new BrushToolProperties();
    this.rectangleProperties = new RectangleToolProperties();
    this.lineProperties = new LineToolProperties();
    this.selectedColor = SelectedColorType.primary;
    this.SelectedColorType = SelectedColorType;
    this.currentTool = this.tools.Pen;
    this.modalIsOpened = false;
  }

  handleColorChanged(eventColor: Color): void {
    this.color = eventColor;
    this.showColorPicker = false;
    this.drawer.close();
  }

  handleAlphaChanged(color: Color): void {
    if (color.a !== this.color.a) {
      this._alpha = color.a;
      this.color = Color.alpha(this.color, color.a);
    }
  }

  openModal(): void {
    if (!this.modalIsOpened) {
      this.dialogRef = this.dialog.open(UserGuideComponent, {});

      this.dialogRef.afterClosed().subscribe(() => {
        this.modalIsOpened = false;
      });
      this.modalIsOpened = true;
    }
  }
  selectTool(selection: Tool): void {
    this.currentTool = selection;

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

  get alphaColor(): Color {
    return Color.alpha(this.color, this._alpha);
  }
}
