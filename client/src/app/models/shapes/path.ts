import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { Rectangle } from './rectangle';

export class Path extends BaseShape {
  static readonly PATH_STYLE: string = 'round';
  private _trace: string;
  private lastPoint: Coordinate;

  get trace(): string {
    return this._trace;
  }

  set trace(node: string) {
    this._trace = node;
    this.svgNode.setAttribute('d', this.trace);
  }

  get origin(): Coordinate {
    return this._origin;
  }

  set origin(c: Coordinate) {
    this._origin = c;
  }
  get height(): number {
    return Math.abs(this.maxCoord[1] - this.minCoord[1]) + this.strokeWidth; // ToDO
  }

  get width(): number {
    return Math.abs(this.maxCoord[0] - this.minCoord[0]) + this.strokeWidth; // ToDO
  }
  constructor(c: Coordinate) {
    super('path');
    this.origin = c;
    this.minCoord = this.maxCoord = [c.x, c.y];
    this._trace = 'M ' + c.x + ' ' + c.y;
    this.lastPoint = c;
  }

  private minCoord: [number, number];
  private maxCoord: [number, number];

  addPoint(c: Coordinate): void {
    this.minCoord = [c.x <= this.minCoord[0] ? c.x : this.minCoord[0], c.y <= this.minCoord[1] ? c.y : this.minCoord[1]];
    this.maxCoord = [c.x >= this.maxCoord[0] ? c.x : this.maxCoord[0], c.y >= this.maxCoord[1] ? c.y : this.maxCoord[1]];
    this.origin = new Coordinate(this.minCoord[0] - this.strokeWidth / 2, this.minCoord[1] - this.strokeWidth / 2);
    // TODO : a little bit sketchy
    if (Math.sqrt(Math.pow(this.lastPoint.x - c.x, 2) + Math.pow(this.lastPoint.y - c.y, 2)) > 1) {
      const origin = new Coordinate(this.lastPoint.x - this.strokeWidth / 2, this.lastPoint.y - this.strokeWidth / 2);
      const box = new Rectangle(origin, this.strokeWidth, this.strokeWidth);
      this.bboxes.push(box);
      this.lastPoint = c;
    }
    this.trace += ' L ' + c.x + ' ' + c.y;
  }

  updateProperties(): void {
    super.updateProperties();

    this.svgNode.style.fill = Path.NO_STYLE;

    this.svgNode.style.stroke = this.primaryColor.rgbString;
    this.svgNode.style.strokeOpacity = this.primaryColor.a.toString();

    this.svgNode.style.strokeLinecap = Path.PATH_STYLE;
    this.svgNode.style.strokeLinejoin = Path.PATH_STYLE;
  }
}
