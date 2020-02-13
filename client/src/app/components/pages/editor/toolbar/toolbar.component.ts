import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Router } from '@angular/router';
import { ColorPickerComponent } from 'src/app/components/shared/color-picker/color-picker.component';
import { Color } from 'src/app/utils/color/color';

import { BrushToolProperties } from 'src/app/models/ToolProperties/BrushToolProperties';
import { ColorPickerColorType, ColorPickerToolProperties } from 'src/app/models/ToolProperties/ColorPickerToolProperties';
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

  tools = Tool;
  rectangleContourTypes = RectangleContourType;
  rectangleContourNames = Object.values(this.rectangleContourTypes);
  lineJunctionTypes = LineJunctionType;
  lineJunctionNames = Object.values(this.lineJunctionTypes);
  colorPickerColorTypes = ColorPickerColorType;

  @ViewChild('drawer', { static: false })
  drawer: MatDrawer;

  @ViewChild('colorPicker', { static: false })
  colorPicker: ColorPickerComponent;

  colorPickerProperties = new ColorPickerToolProperties();
  penProperties = new PenToolProperties();
  brushProperties = new BrushToolProperties();
  rectangleProperties = new RectangleToolProperties(this.colorPickerProperties.primaryColor, this.colorPickerProperties.secondaryColor);
  lineProperties = new LineToolProperties();

  currentTool = this.tools.Pen;

  constructor(private router: Router) {}

  handleColorChanged(eventColor: Color) {
    if (this.colorPickerProperties.selectedColor === this.colorPickerColorTypes.PRIMARY) {
      this.colorPickerProperties.primaryColor = eventColor;
      this.rectangleProperties.primaryColor = this.colorPickerProperties.primaryColor;
    } else {
      this.colorPickerProperties.secondaryColor = eventColor;
      this.rectangleProperties.secondaryColor = this.colorPickerProperties.secondaryColor;
    }
  }

  selectTool(selection: Tool) {
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

  updateTool() {
    this.selectTool(this.currentTool);
  }

  openPanel(selection: Tool) {
    if (this.currentTool === selection) {
      this.drawer.toggle();
    } else {
      this.currentTool = selection;
      this.drawer.open();
    }
  }

  selectColor(selection: ColorPickerColorType) {
    if (!this.colorPicker) {
      this.currentTool = this.tools.ColorPicker;
    }

    this.colorPickerProperties.selectedColor = selection;
    this.currentTool = this.tools.ColorPicker;

    switch (this.colorPickerProperties.selectedColor) {
      case this.colorPickerColorTypes.PRIMARY:
        this.colorPicker.color = this.colorPickerProperties.primaryColor;
        break;
      case this.colorPickerColorTypes.SECONDARY:
        this.colorPicker.color = this.colorPickerProperties.secondaryColor;
        break;
    }
    this.drawer.open();
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  get color(): Color {
    switch (this.colorPickerProperties.selectedColor) {
      case this.colorPickerColorTypes.PRIMARY:
        return this.colorPickerProperties.primaryColor;
      case this.colorPickerColorTypes.SECONDARY:
        return this.colorPickerProperties.secondaryColor;
    }
  }
}
