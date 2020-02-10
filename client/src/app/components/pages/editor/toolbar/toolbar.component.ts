import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Router } from '@angular/router';

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

  @ViewChild('drawer', { static: false })
  drawer: MatDrawer;

  lineJunctionTypes: string[] = ['Avec points', 'Sans points'];
  rectangleContourTypes: string[] = ['Contour', 'Plein', 'Plein avec contour'];
  tools = Tool;

  thicknessPencil = 50;

  lineThickness = 50;
  lineJunction = this.lineJunctionTypes[0];

  rectangleContour = this.rectangleContourTypes[0];

  thicknessLinePoints = 50;
  thicknessBrush = 50;
  minthickness = 1;
  maxthickness = 100;
  stepthickness = 0.1;
  selectedTool: Tool;

  constructor(private router: Router) {}

  selectTool(selection: Tool) {
    if (this.selectedTool === selection) {
      this.drawer.toggle();
    } else {
      this.selectedTool = selection;
      this.drawer.open();
    }
  }

  goHome() {
    this.router.navigate(['']);
  }

  // TODO Recheck the number input field validation for the custom module
  validateNumber(event: KeyboardEvent) {
    const reg = RegExp('^[0-9]$');
    return reg.test(event.key);
  }
}
