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
  @Output() editorBackgroundChanged = new EventEmitter<Color>();

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
  penProperties = new PenToolProperties(this.colorPickerProperties.primaryColor, this.colorPickerProperties.secondaryColor);
  brushProperties = new BrushToolProperties(this.colorPickerProperties.primaryColor, this.colorPickerProperties.secondaryColor);
  rectangleProperties = new RectangleToolProperties(this.colorPickerProperties.primaryColor, this.colorPickerProperties.secondaryColor);
  lineProperties = new LineToolProperties(this.colorPickerProperties.primaryColor, this.colorPickerProperties.secondaryColor);

  lastSelectedColor: ColorPickerColorType;
  currentTool = this.tools.Pen;

  constructor(private router: Router) {}

  handleColorPickerLoaded(): void {
    this.selectColor(this.colorPickerProperties.selectedColor);
  }

  handleColorChanged(eventColor: Color): void {
    if (this.colorPickerProperties.selectedColor === this.colorPickerColorTypes.PRIMARY) {
      this.colorPickerProperties.primaryColor = eventColor;
    } else {
      this.colorPickerProperties.secondaryColor = eventColor;
    }
  }

  selectTool(selection: Tool): void {
    this.currentTool = selection;

    switch (this.currentTool) {
      case this.tools.Pen:
        this.penProperties.primaryColor = this.colorPickerProperties.primaryColor;
        this.penProperties.secondaryColor = this.colorPickerProperties.secondaryColor;
        this.toolChanged.emit(this.penProperties);
        break;
      case this.tools.Brush:
        this.brushProperties.primaryColor = this.colorPickerProperties.primaryColor;
        this.brushProperties.secondaryColor = this.colorPickerProperties.secondaryColor;
        this.toolChanged.emit(this.brushProperties);
        break;
      case this.tools.Rectangle:
        this.rectangleProperties.primaryColor = this.colorPickerProperties.primaryColor;
        this.rectangleProperties.secondaryColor = this.colorPickerProperties.secondaryColor;
        this.toolChanged.emit(this.rectangleProperties);
        break;
      case this.tools.Line:
        this.lineProperties.primaryColor = this.colorPickerProperties.primaryColor;
        this.lineProperties.secondaryColor = this.colorPickerProperties.secondaryColor;
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

  selectColor(selection: ColorPickerColorType): void {
    this.colorPickerProperties.selectedColor = selection;

    if (!this.colorPicker) {
      this.selectTool(this.tools.ColorPicker);
    } else {
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
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  updateBackground(color: Color): void {
    this.editorBackgroundChanged.emit(color);
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
