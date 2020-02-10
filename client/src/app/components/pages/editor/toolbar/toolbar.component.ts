import { Component, ViewChild, ViewChildren } from '@angular/core';
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
  @ViewChild('drawer', { static: false })
  drawer: MatDrawer;

  @ViewChildren('colorPicker')
  colorPicker: ColorPickerComponent;

  tools = Tool;

  thicknessPencil = 50;
  thicknessBrush = 50;
  minthickness = 1;
  maxthickness = 100;
  stepthickness = 0.1;

  selectedTool: Tool;
  selectedColor = false;

  selectedPrimaryColor = 'white';
  primaryColorZ = 1000;
  selectedSecondaryColor = 'black';
  secondaryColorZ = 500;

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
        this.secondaryColorZ = 1000;
        this.primaryColorZ = 500;
        this.colorPicker.color = Color.hex(this.selectedSecondaryColor);
      } else {
        this.secondaryColorZ = 500;
        this.primaryColorZ = 1000;
        this.colorPicker.color = Color.hex(this.selectedPrimaryColor);
      }
      this.drawer.open();
    } else {
      this.selectedTool = this.tools.ColorPicker;
    }
  }

  changePrimaryColor() {
    return true;
  }

  changeSecondaryColor() {
    return true;
  }

  goHome() {
    this.router.navigate(['']);
  }
}
