import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Color } from 'src/app/utils/color/color';

@Component({
  selector: 'app-drawing-surface',
  templateUrl: './drawing-surface.component.html',
  styleUrls: ['./drawing-surface.component.scss'],
})
export class DrawingSurfaceComponent {
  static readonly DEFAULT_WIDTH: number = 500;
  static readonly DEFAULT_HEIGHT: number = 500;
  static readonly DEFAULT_COLOR: Color = Color.WHITE;
  @Input() width: number;
  @Input() height: number;
  @Input() color: Color;

  @ViewChild('svg', { static: false })
  private _svg: ElementRef;

  get svg(): SVGElement {
    return this._svg.nativeElement;
  }

  constructor() {
    this.color = Color.WHITE;
  }

  addShape(shape: BaseShape): void {
    this.svg.appendChild(shape.svgNode);
  }

  removeShape(shape: BaseShape): void {
    this.svg.removeChild(shape.svgNode);
  }
}
