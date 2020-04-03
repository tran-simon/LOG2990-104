import { Coordinate } from '../../utils/math/coordinate';
import { MathUtil } from '../../utils/math/math-util';
import { BaseShape } from './base-shape';
import { Rectangle } from './rectangle';

export class Polygon extends BaseShape {
  static readonly MIN_POLY_EDGES: number = 3;
  static readonly MAX_POLY_EDGES: number = 12;
  // tslint:disable-next-line:no-magic-numbers
  static readonly ORIENTATION_ANGLE: number = (3 * Math.PI) / 2;

  private points: Coordinate[];
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

  get height(): number {
    return this.points.length > 0 ? Coordinate.maxArrayXYCoord(this.points).y - this.relativeOrigin.y : 0;
  }

  get width(): number {
    return this.points.length > 0 ? Coordinate.maxArrayXYCoord(this.points).x - this.relativeOrigin.x : 0;
  }

  private get relativeOrigin(): Coordinate {
    // todo - optimize by resetting to zero and/or storing begin/end
    return this.points.length > 0 ? Coordinate.minArrayXYCoord(this.points) : new Coordinate();
  }

  get origin(): Coordinate {
    return Coordinate.add(this.relativeOrigin, this.offset);
  }
  set origin(c: Coordinate) {
    this.offset = Coordinate.substract(c, this.relativeOrigin);
  }

  constructor(origin: Coordinate = new Coordinate(), nEdges: number = Polygon.MIN_POLY_EDGES) {
    super('polygon');
    this.points = new Array<Coordinate>();
    this.origin = origin;
    this.nEdges = nEdges;
  }

  private coordRelativeToInCircle(angle: number, dimensions: Coordinate): Coordinate {
    const minDimension = Math.min(dimensions.x, dimensions.y);
    const x = minDimension / 2 + (minDimension / 2) * Math.cos(angle);
    const y = minDimension / 2 + (minDimension / 2) * Math.sin(angle);
    return new Coordinate(x, y);
  }

  updatePoints(dimensions: Coordinate, delta: Coordinate, box: Rectangle): void {
    // todo - refactor
    let angle = Polygon.ORIENTATION_ANGLE;
    this.points.length = 0;

    if (dimensions.x === 0 || dimensions.y === 0) {
      return;
    }

    for (let i = 0; i < this.nEdges; i++) {
      angle += this.interiorAngle;
      this.points.push(this.coordRelativeToInCircle(angle, dimensions));
    }

    const ratio = Math.max(this.width / dimensions.x, this.height / dimensions.y);
    dimensions = new Coordinate(dimensions.x / ratio, dimensions.y / ratio);

    for (let i = 0; i < this.nEdges; i++) {
      angle += this.interiorAngle;
      this.points[i] = this.coordRelativeToInCircle(angle, dimensions);
    }

    this.origin = box.origin;

    if (delta.y < 0) {
      this.origin = new Coordinate(this.origin.x, this.origin.y + box.height - this.height);
    }

    if (delta.x < 0) {
      this.origin = new Coordinate(this.origin.x + box.width - this.width, this.origin.y);
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
