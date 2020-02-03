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
  @ViewChild('drawer', { static: false })
  drawer: MatDrawer;

  @ViewChild('colorPicker', { static: false })
  colorPicker: ColorPickerComponent;

  tools = Tool;

  thicknessPencil = 50;
  thicknessBrush = 50;
  minthickness = 1;
  maxthickness = 100;
  stepthickness = 0.1;

  selectedTool: Tool;
  selectedColor = false;
  selectedPrimaryColor = new Color(255, 255, 255);
  selectedSecondaryColor = new Color(0, 0, 0);

  constructor(private router: Router) {}

  selectTool(selection: Tool) {
    if (this.selectedTool === selection) {
      this.drawer.toggle();
    } else {
      this.selectedTool = selection;
      this.drawer.open();
    }
  }

  selectColor(selection: boolean) {
    this.selectedColor = selection;
    this.selectedTool = this.tools.ColorPicker;
    if (selection === true) {
      this.colorPicker.color = this.selectedSecondaryColor;
    } else {
      this.colorPicker.color = this.selectedPrimaryColor;
    }
    this.drawer.open();
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
