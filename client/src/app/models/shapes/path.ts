import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class Path extends BaseShape {
  static readonly PATH_STYLE: string = 'round';
  private _trace: string; // todo - store individual points

  private _width: number;
  private _height: number;

  get trace(): string {
    return this._trace;
  }

  set trace(node: string) {
    this._trace = node;
    this.svgNode.setAttribute('d', this.trace);
  }

  get origin(): Coordinate {
    return new Coordinate();
  }

  set origin(c: Coordinate) {
    // todo
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  constructor(c: Coordinate) {
    super('path');
    this.origin = c;
    this._trace = 'M ' + c.x + ' ' + c.y;
  }

  addPoint(c: Coordinate): void {
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
