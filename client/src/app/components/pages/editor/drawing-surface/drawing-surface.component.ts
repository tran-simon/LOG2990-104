import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Color } from 'src/app/utils/color/color';

@Component({
  selector: 'app-drawing-surface',
  templateUrl: './drawing-surface.component.html',
  styleUrls: ['./drawing-surface.component.scss'],
})
export class DrawingSurfaceComponent {
  // tslint:disable-next-line:typedef
  static SHAPE_ID = 0;
  static readonly SHAPE_ID_PREFIX: string = 'shape-';
  static readonly DEFAULT_WIDTH: number = 500;
  static readonly DEFAULT_HEIGHT: number = 500;
  static readonly DEFAULT_COLOR: Color = Color.WHITE;
  static readonly DEFAULT_LARGEGRID_SIZE: number = 80;
  static readonly DEFAULT_SMALLGRID_SIZE: number = 16;
  static readonly DEFAULT_GRIDOPACITY_SIZE: number = 0.75;
  @Input() width: number;
  @Input() height: number;
  @Input() color: Color;
  @Input() smallGrid: number;
  @Input() largeGrid: number;
  @Input() gridOpacity: number;
  @Output() shapeClicked: EventEmitter<BaseShape>;
  @Output() shapeRightClicked: EventEmitter<BaseShape>;

  @ViewChild('svg', { static: false })
  private _svg: ElementRef;

  get svg(): SVGElement {
    return this._svg.nativeElement;
  }

  constructor() {
    this.color = Color.WHITE;
    this.shapeClicked = new EventEmitter<BaseShape>();
    this.shapeRightClicked = new EventEmitter<BaseShape>();
    this.smallGrid = DrawingSurfaceComponent.DEFAULT_SMALLGRID_SIZE;
    this.largeGrid = DrawingSurfaceComponent.DEFAULT_LARGEGRID_SIZE;
    this.gridOpacity = DrawingSurfaceComponent.DEFAULT_GRIDOPACITY_SIZE;
  }

  addShape(shape: BaseShape): void {
    shape.svgNode.onclick = () => {
      this.shapeClicked.emit(shape);
    };
    shape.svgNode.oncontextmenu = () => {
      this.shapeRightClicked.emit(shape);
    };

    shape.svgNode.id = DrawingSurfaceComponent.SHAPE_ID_PREFIX + DrawingSurfaceComponent.SHAPE_ID++;
    this.svg.appendChild(shape.svgNode);
  }

  removeShape(shape: BaseShape): void {
    if (this.svg.contains(shape.svgNode)) {
      this.svg.removeChild(shape.svgNode);
    }
  }
}
