import { Component, ViewChild } from '@angular/core';
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
  MIN_THICKNESS = 1;
  MAX_THICKNESS = 100;
  STEP_THICKNESS = 0.1;

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

  selectedColor: boolean;
  selectedTool: Tool;
  selectedPrimaryColor: string;
  selectedSecondaryColor: string;

  constructor(private router: Router) {
    this.selectedColor = false;
    this.selectedTool = this.tools.Pencil;
    this.selectedPrimaryColor = 'white';
    this.selectedSecondaryColor = 'black';
  }

  handleColorChanged(eventColor: Color) {
    if (this.selectedColor === false) {
      this.selectedPrimaryColor = eventColor.hexString;
    } else {
      this.selectedSecondaryColor = eventColor.hexString;
    }
  }

  selectTool(selection: Tool) {
    if (this.selectedTool === selection) {
      this.drawer.toggle();
    } else {
      this.selectedTool = selection;
      this.drawer.open();
    }
  }

  selectColor(selection: boolean) {
    if (this.colorPicker) {
      this.selectedColor = selection;
      this.selectedTool = this.tools.ColorPicker;
      if (selection === true) {
        this.colorPicker.color = Color.hex(this.selectedSecondaryColor);
      } else {
        this.colorPicker.color = Color.hex(this.selectedPrimaryColor);
      }
      this.drawer.open();
    } else {
      this.selectedTool = this.tools.ColorPicker;
    }
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  // TODO Recheck the number input field validation for the custom module
  validateNumber(event: KeyboardEvent) {
    const reg = RegExp('^[0-9]$');
    return reg.test(event.key);
  }
}
