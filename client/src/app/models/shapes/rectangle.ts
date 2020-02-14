import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class Rectangle extends BaseShape {
  private _height: number;
  private _width: number;

  get height(): number {
    return this._height;
  }

  set height(height: number) {
    this._height = !height ? 0 : Math.abs(height);
    this.svgNode.setAttribute('height', this.height.toString());
  }

  get width(): number {
    return this._width;
  }

  set width(width: number) {
    this._width = !width ? 0 : Math.abs(width);
    this.svgNode.setAttribute('width', this.width.toString());
  }

  get origin(): Coordinate {
    return this._origin;
  }

  set origin(c: Coordinate) {
    this._origin = c;
    this.svgNode.setAttribute('x', this._origin.x.toString());
    this.svgNode.setAttribute('y', this._origin.y.toString());
  }

  get center(): Coordinate {
    return new Coordinate(this.origin.x + this.width / 2, this.origin.y + this.height / 2);
  }

  constructor(origin = new Coordinate(), size: number = 0) {
    super('rect');
    this.origin = origin;
    this.width = size;
    this.height = size;
  }
}
