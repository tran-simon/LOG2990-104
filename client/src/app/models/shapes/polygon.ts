import { Coordinate } from '../../utils/math/coordinate';
import { MathUtil } from '../../utils/math/math-util';
import { BaseShape } from './base-shape';

export class Polygon extends BaseShape {
  static readonly MIN_POLY_EDGES: number = 3;
  static readonly MAX_POLY_EDGES: number = 12;
  // tslint:disable-next-line:no-magic-numbers
  static readonly ORIENTATION_ANGLE: number = (3 * Math.PI) / 2;

  points: Coordinate[];
  private _interiorAngle: number;

  get interiorAngle(): number {
    return this._interiorAngle;
  }

  private _nEdges: number;
  get nEdges(): number {
    return this._nEdges;
  }
  set nEdges(nEdges: number) {
    this._nEdges = nEdges ? MathUtil.fit(nEdges, Polygon.MIN_POLY_EDGES, Polygon.MAX_POLY_EDGES) : Polygon.MIN_POLY_EDGES;
    this._interiorAngle = (2 * Math.PI) / this.nEdges;
  }

  private _height: number;
  get height(): number {
    return this._height;
  }
  set height(height: number) {
    this._height = !height ? 0 : Math.abs(height);
  }

  private _width: number;
  get width(): number {
    return this._width;
  }
  set width(width: number) {
    this._width = !width ? 0 : Math.abs(width);
  }

  private _origin: Coordinate;
  get origin(): Coordinate {
    return this._origin;
  }
  set origin(c: Coordinate) {
    this._origin = c;
    this.svgNode.setAttribute('x', this._origin.x.toString());
    this.svgNode.setAttribute('y', this._origin.y.toString());
  }

  constructor(origin: Coordinate = new Coordinate(), nEdges: number = Polygon.MIN_POLY_EDGES) {
    super('polygon');
    this.origin = origin;
    this.nEdges = nEdges;
    this.width = 0;
    this.height = 0;
    this.points = [];
  }

  private coordRelativeToInCircle(angle: number): Coordinate {
    const x = this.center.x + (this.width / 2) * Math.cos(angle);
    const y = this.center.y + (this.height / 2) * Math.sin(angle);
    return new Coordinate(x, y);
  }

  updatePoints(): void {
    let angle = Polygon.ORIENTATION_ANGLE;
    for (let i = 0; i < this.nEdges; i++) {
      angle += this.interiorAngle;
      this.points[i] = this.coordRelativeToInCircle(angle);
    }
  }

  drawPoints(): void {
    let sPoints = '';
    this.points.forEach((c: Coordinate) => {
      sPoints += c.x.toString() + ',' + c.y.toString() + ' ';
    });
    this.svgNode.setAttribute('points', sPoints);
  }
}
