import { Coordinate } from '../../utils/math/coordinate';
import { BaseShape } from './base-shape';

export class Polygon extends BaseShape {
  private _nEdges: number;

  get nEdges(): number {
    return this._nEdges;
  }

  private _height: number;

  get height(): number {
    return this._height;
  }

  set height(height: number) {
    this._height = !height ? 0 : Math.abs(height);
    this.svgNode.setAttribute('height', this.height.toString());
  }

  private _width: number;

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

  constructor(origin: Coordinate, nEdges: number = 3, size: number = 0) {
    super('polygon');
    this.origin = new Coordinate();
    this.width = size;
    this.height = size;
    this._nEdges = nEdges;
  }
}
