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

  @ViewChild('drawer', { static: false })
  drawer: MatDrawer;

  @ViewChild('colorPicker', { static: false })
  colorPicker: ColorPickerComponent;

  tools = Tool;

  thicknessPencil = 50;
  thicknessBrush = 50;

  selectedTool: Tool;
  selectedColor = false;

  selectedPrimaryColor = 'white';
  selectedSecondaryColor = 'black';

  constructor(private router: Router) {}

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
    if (this.colorPicker != null) {
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

  goHome() {
    this.router.navigate(['']);
  }
}
