import { Component, Input, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Router } from '@angular/router';
import { ColorPickerComponent } from 'src/app/components/shared/color-picker/color-picker.component';
import { Color } from 'src/app/utils/color/color';

enum Tool {
  Pencil,
  Brush,
  Rectangle,
  Line,
  ColorPicker,
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  static readonly TOOLBAR_WIDTH = 60;
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 100;
  static readonly STEP_THICKNESS = 0.1;

  @Input() minThickness = ToolbarComponent.MIN_THICKNESS;
  @Input() maxThickness = ToolbarComponent.MAX_THICKNESS;
  @Input() stepThickness = ToolbarComponent.STEP_THICKNESS;

  lineJunctionTypes: string[] = ['Avec points', 'Sans points'];
  rectangleContourTypes: string[] = ['Contour', 'Plein', 'Plein avec contour'];
  tools = Tool;

  @ViewChild('drawer', { static: false })
  drawer: MatDrawer;

  @ViewChild('colorPicker', { static: false })
  colorPicker: ColorPickerComponent;

  lineJunction = this.lineJunctionTypes[0];
  rectangleContour = this.rectangleContourTypes[0];

  thicknessPencil = 50;
  thicknessBrush = 50;
  thicknessLine = 50;
  thicknessLinePoints = 50;
  thicknessRectangle = 50;

  isPrimarySelected = true;
  selectedTool = this.tools.Pencil;
  selectedPrimaryColor = Color.WHITE;
  selectedSecondaryColor = Color.BLACK;

  constructor(private router: Router) {}

  handleColorChanged(eventColor: Color) {
    if (this.isPrimarySelected) {
      this.selectedPrimaryColor = eventColor;
    } else {
      this.selectedSecondaryColor = eventColor;
    }
  }

  selectTool(selection: Tool) {
    this.selectedTool = selection;
  }

  openPanel(selection: Tool) {
    if (this.selectedTool === selection) {
      this.drawer.toggle();
    } else {
      this.selectedTool = selection;
      this.drawer.open();
    }
  }

  selectColor(selection: boolean) {
    if (!this.colorPicker) {
      this.selectedTool = this.tools.ColorPicker;
    }

    this.isPrimarySelected = selection;
    this.selectedTool = this.tools.ColorPicker;
    this.colorPicker.color = selection ? this.selectedPrimaryColor : this.selectedSecondaryColor;
    this.drawer.open();
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  get color(): Color {
    return this.isPrimarySelected ? this.selectedPrimaryColor : this.selectedSecondaryColor;
  }
}
