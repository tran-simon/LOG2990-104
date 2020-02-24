import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Color } from 'src/app/utils/color/color';

@Component({
  selector: 'app-drawing-surface',
  templateUrl: './drawing-surface.component.html',
  styleUrls: ['./drawing-surface.component.scss'],
})
export class DrawingSurfaceComponent {
  @Input() width: number;
  @Input() height: number;
  @Input() color: Color;

  @ViewChild('svg', { static: false })
  svg: ElementRef;

  constructor() {
    this.color = Color.WHITE;
  }

  addShape(shape: BaseShape): void {
    this.svg.nativeElement.appendChild(shape.svgNode);
  }

  removeShape(shape: BaseShape): void {
    this.svg.nativeElement.removeChild(shape.svgNode);
  }
}
