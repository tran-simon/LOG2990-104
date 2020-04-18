import { BaseShape } from '@models/shapes/base-shape';
import { BoundingBox } from '@models/shapes/bounding-box';
import { Rectangle } from '@models/shapes/rectangle';
import { Color } from '@utils/color/color';
import { Coordinate } from '@utils/math/coordinate';

export class Selection {
  private readonly SELECT_AREA_DASHARRAY: string = '5';

  readonly area: Rectangle;
  readonly shapes: BaseShape[];
  readonly previous: BaseShape[];
  boundingBox: BoundingBox;

  constructor() {
    this.shapes = new Array<BaseShape>();
    this.previous = new Array<BaseShape>();
    this.boundingBox = new BoundingBox();

    this.area = new Rectangle();
    this.area.primaryColor = Color.TRANSPARENT;
    this.area.svgNode.style.pointerEvents = BaseShape.CSS_NONE;
    this.area.svgNode.style.strokeDasharray = this.SELECT_AREA_DASHARRAY;
    this.area.updateProperties();
  }

  static detectBoundingBoxCollision(area: Rectangle, shape: BaseShape): boolean {
    return !(area.end.x < shape.origin.x || area.end.y < shape.origin.y || area.origin.x > shape.end.x || area.origin.y > shape.end.y);
  }

  static detectPointCollision(point: Coordinate, shape: BaseShape): boolean {
    return point.x >= shape.origin.x && point.x <= shape.end.x && point.y >= shape.origin.y && point.y <= shape.end.y;
  }

  clear(): void {
    this.shapes.length = 0;
  }

  updateBoundingBox(): void {
    if (this.shapes.length > 0) {
      this.boundingBox.origin = this.shapes[0].origin;
      this.boundingBox.end = this.shapes[0].end;
      this.shapes.forEach((shape) => {
        this.boundingBox.start = Coordinate.minXYCoord(
          this.boundingBox.origin,
          Coordinate.subtract(shape.origin, new Coordinate(shape.strokeWidth / 2, shape.strokeWidth / 2)), // todo - proper fix
        );
        this.boundingBox.end = Coordinate.maxXYCoord(
          this.boundingBox.end,
          Coordinate.add(shape.end, new Coordinate(shape.strokeWidth / 2, shape.strokeWidth / 2)),
        );
      });
    } else {
      this.boundingBox.origin = new Coordinate();
      this.boundingBox.end = new Coordinate();
    }
  }

  reverse(shape: BaseShape, array: BaseShape[] = this.shapes): void {
    array.indexOf(shape) === -1 ? this.addSelectedShape(shape) : this.removeSelectedShape(shape);
    this.updateBoundingBox();
  }

  addSelectedShape(shape: BaseShape): void {
    const index = this.shapes.indexOf(shape);
    if (index === -1) {
      this.shapes.push(shape);
    }
  }

  private removeSelectedShape(shape: BaseShape): void {
    const index = this.shapes.indexOf(shape);
    if (index !== -1) {
      this.shapes.splice(index, 1);
    }
  }

  resizeArea(origin: Coordinate = new Coordinate(), end: Coordinate = origin): void {
    this.area.origin = origin;
    this.area.end = end;
  }
}
