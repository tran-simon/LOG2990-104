import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class Path extends BaseShape {
  private _trace: string;

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

  get width(): number {
    return 0; // todo
  }

  get height(): number {
    return 0; // todo
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
    const fillAlpha = this.shapeProperties.fillColor.a;

    this._svgNode.style.fill = 'transparent';

    this._svgNode.style.stroke = fillAlpha ? this.shapeProperties.fillColor.rgbString : 'none';
    this._svgNode.style.strokeOpacity = this.shapeProperties.fillColor.a.toString();

    this._svgNode.style.strokeLinecap = 'round';
    this._svgNode.style.strokeLinejoin = 'round';
  }
}
