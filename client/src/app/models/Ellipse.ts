import { BaseShape } from './BaseShape';
import { Coordinate } from './Coordinate';

export class Ellipse extends BaseShape {
  private _radiusX: number;

  get radiusX(): number {
    return this._radiusX;
  }

  set radiusX(rx: number) {
    this._radiusX = !rx ? 0 : Math.abs(rx);
    this.svgNode.setAttribute('rx', this._radiusX.toString());
  }

  set origin(c: Coordinate) {
    this._origin = c;
    this.svgNode.setAttribute('cx', this._origin.x.toString());
    this.svgNode.setAttribute('cy', this._origin.y.toString());
  }

  private _radiusY: number;

  get radiusY(): number {
    return this._radiusY;
  }

  set radiusY(ry: number) {
    this._radiusY = !ry ? 0 : Math.abs(ry);
    this.svgNode.setAttribute('ry', this._radiusY.toString());
  }

  constructor(origin = new Coordinate(), rx: number = 0, ry: number = rx) {
    super('ellipse');
    this.origin = origin;
    this.radiusX = rx;
    this.radiusY = ry;
  }
}
