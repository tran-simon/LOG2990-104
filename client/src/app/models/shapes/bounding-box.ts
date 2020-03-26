import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { BaseShape } from './base-shape';
import { Rectangle } from './rectangle';

export class BoundingBox extends BaseShape {
  static readonly CONTROL_POINT_COUNT: number = 4;
  static readonly CONTROL_POINT_TOP: number = 0;
  static readonly CONTROL_POINT_RIGHT: number = 1;
  static readonly CONTROL_POINT_BOTTOM: number = 2;
  static readonly CONTROL_POINT_LEFT: number = 3;
  static readonly CONTROL_POINT_SIZE: number = 5;

  // tslint:disable-next-line:no-magic-numbers
  static readonly BOUNDING_BOX_COLOR: Color = Color.rgb255(80, 80, 255, 0.25);

  private outline: Rectangle;
  private controlPoints: Rectangle[];

  get origin(): Coordinate {
    return this.outline.origin;
  }

  set origin(c: Coordinate) {
    this.outline.origin = c;
    this.updateControlPoints();
  }

  get start(): Coordinate {
    return this.outline.start;
  }

  set start(c: Coordinate) {
    this.outline.start = c;
    this.updateControlPoints();
  }

  get end(): Coordinate {
    return this.outline.end;
  }

  set end(c: Coordinate) {
    this.outline.end = c;
    this.updateControlPoints();
  }

  constructor(c: Coordinate) {
    super('g');
    this.outline = new Rectangle(c);
    this.controlPoints = new Array<Rectangle>();
    this.svgNode.appendChild(this.outline.svgNode);

    for (let i = 0; i < BoundingBox.CONTROL_POINT_COUNT; i++) {
      const controlPoint = new Rectangle();
      controlPoint.width = BoundingBox.CONTROL_POINT_SIZE;
      controlPoint.height = BoundingBox.CONTROL_POINT_SIZE;
      this.controlPoints.push(controlPoint);
      this.svgNode.appendChild(controlPoint.svgNode);
    }

    this.outline.svgNode.style.pointerEvents = 'none';
    this.outline.primaryColor = BoundingBox.BOUNDING_BOX_COLOR;
    this.outline.secondaryColor = BoundingBox.BOUNDING_BOX_COLOR;
    this.outline.updateProperties();

    this.updateControlPoints();
  }

  updateControlPoints(): void {
    if (this.outline.width === 0 && this.outline.width === 0) {
      this.controlPoints.forEach((point) => {
        point.svgNode.style.display = 'none';
      });
    } else {
      this.controlPoints.forEach((point) => {
        point.svgNode.style.display = '';
      });
      this.controlPoints[BoundingBox.CONTROL_POINT_TOP].center = new Coordinate(this.outline.center.x, this.outline.origin.y);
      this.controlPoints[BoundingBox.CONTROL_POINT_RIGHT].center = new Coordinate(this.outline.end.x, this.outline.center.y);
      this.controlPoints[BoundingBox.CONTROL_POINT_BOTTOM].center = new Coordinate(this.outline.center.x, this.outline.end.y);
      this.controlPoints[BoundingBox.CONTROL_POINT_LEFT].center = new Coordinate(this.outline.origin.x, this.outline.center.y);
    }
  }
}
