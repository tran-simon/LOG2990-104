import { Coordinate } from '../../utils/math/coordinate';
import { BaseShape } from './base-shape';
export const MIN_POLY_EDGES = 3;
export const MAX_POLY_EDGES = 12;

export class Polygon extends BaseShape {
  points: Coordinate[];
  readonly interiorAngle: number; // in rad

  private _nEdges: number;
  get nEdges(): number {
    return this._nEdges;
  }
  set nEdges(nEdges: number) {
    if (nEdges > MAX_POLY_EDGES || !nEdges) {
      this._nEdges = MAX_POLY_EDGES;
    } else if (nEdges < MIN_POLY_EDGES) {
      this._nEdges = MIN_POLY_EDGES;
    } else {
      this._nEdges = nEdges;
    }
  }

  private _size: number;
  get size(): number {
    return this._size;
  }
  set size(size: number) {
    this._size = !size ? 0 : Math.abs(size);
    this.updatePoints();
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
    return new Coordinate(this.origin.x + this.size / 2, this.origin.y + this.size / 2);
  }

  constructor(origin = new Coordinate(), nEdges: number = MIN_POLY_EDGES, size: number = 0) {
    super('polygon');
    this.origin = origin;
    this.size = size;
    this.nEdges = nEdges;
    this.interiorAngle = (2 * Math.PI) / this.nEdges;
    this.points = [];
  }

  updatePoints() {
    let x: number;
    let y: number;
    let angle = Math.PI / 2 - this.interiorAngle / 2;
    let sPoints = '';
    for (let i = 0; i < this.nEdges; i++) {
      angle += this.interiorAngle;
      x = this.center.x + (this.size / 2) * Math.cos(angle);
      y = this.center.y + (this.size / 2) * Math.sin(angle);
      this.points[i] = { x, y };
      sPoints += x.toString() + ',' + y.toString() + ' ';
    }
    this.svgNode.setAttribute('points', sPoints);
  }
}
