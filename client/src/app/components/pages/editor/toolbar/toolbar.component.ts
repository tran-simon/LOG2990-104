import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Router } from '@angular/router';
import { ColorPickerComponent } from 'src/app/components/shared/color-picker/color-picker.component';
import { SelectedColorsService, SelectedColorType } from 'src/app/services/selected-colors.service';
import { Color } from 'src/app/utils/color/color';

import { BrushToolProperties } from 'src/app/models/ToolProperties/BrushToolProperties';
import { LineJunctionType, LineToolProperties } from 'src/app/models/ToolProperties/LineToolProperties';
import { PenToolProperties } from 'src/app/models/ToolProperties/PenToolProperties';
import { RectangleContourType, RectangleToolProperties } from 'src/app/models/ToolProperties/RectangleToolProperties';
import { ToolProperties } from 'src/app/models/ToolProperties/ToolProperties';

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

  @Input() stepThickness = ToolbarComponent.SLIDER_STEP;
  @Output() toolChanged = new EventEmitter<ToolProperties>();
  @Output() editorBackgroundChanged = new EventEmitter<Color>();

  tools = Tool;
  rectangleContourTypes = RectangleContourType;
  rectangleContourNames = Object.values(this.rectangleContourTypes);
  lineJunctionTypes = LineJunctionType;
  lineJunctionNames = Object.values(this.lineJunctionTypes);

  @ViewChild('drawer', { static: false })
  drawer: MatDrawer;

  @ViewChild('colorPicker', { static: false })
  colorPicker: ColorPickerComponent;

  penProperties = new PenToolProperties();
  brushProperties = new BrushToolProperties();
  rectangleProperties = new RectangleToolProperties();
  lineProperties = new LineToolProperties();
  selectedColor = SelectedColorType.primary;

  SelectedColorType = SelectedColorType;

  currentTool = this.tools.Pen;

  constructor(private router: Router, protected selectedColors: SelectedColorsService) {}

  handleColorChanged(eventColor: Color): void {
    this.selectedColors.setColorByIndex(eventColor, this.selectedColor);
    this.drawer.close();
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
    } else {
      this.currentTool = selection;
      this.drawer.open();
    }
  }

  selectColor(index: number): void {
    if (!this.colorPicker) {
      this.selectTool(this.tools.ColorPicker);
    } else {
      this.currentTool = this.tools.ColorPicker;

      this.drawer.open();
    }
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

  get color(): Color {
    return this.selectedColors.colorByIndex(this.selectedColor);
  }
}
