import { Coordinate } from '../../utils/math/coordinate';
import { BaseShape } from './base-shape';

export const MIN_POLY_EDGES = 3;
export const MAX_POLY_EDGES = 12;

export class Polygon extends BaseShape {
  points: Coordinate[];
  private _interiorAngle: number; // in rad

  get interiorAngle(): number {
    return this._interiorAngle;
  }

  private _nEdges: number;

  get nEdges(): number {
    return this._nEdges;
  }

  set nEdges(nEdges: number) {
    if (nEdges < MIN_POLY_EDGES || !nEdges) {
      this._nEdges = MIN_POLY_EDGES;
    } else if (nEdges > MAX_POLY_EDGES) {
      this._nEdges = MAX_POLY_EDGES;
    } else {
      this._nEdges = nEdges;
    }
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

  constructor(origin = new Coordinate(), nEdges: number = MIN_POLY_EDGES) {
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

  // Will be useful later for changing individual polygon vertex position with SelectionTool
  transformPoint(index: number, newPoint: Coordinate) {
    if (index < this.points.length && !!index && !!newPoint) {
      this.points[index] = newPoint;
    }
  }

  updatePoints() {
    let angle = this.interiorAngle / 2 + Math.PI / 2;
    for (let i = 0; i < this.nEdges; i++) {
      angle += this.interiorAngle;
      this.points[i] = this.coordRelativeToInCircle(angle);
    }
  }

  drawPoints(): void {
    let sPoints = '';
    for (const c of this.points) {
      sPoints += c.x.toString() + ',' + c.y.toString() + ' ';
    }
    this.svgNode.setAttribute('points', sPoints);
  }
}
