import { BaseShape } from './BaseShape';
import { Coordinate } from './Coordinate';

export class Path extends BaseShape {
  private _trace: string;

  get trace(): string {
    return this._trace;
  }

  set trace(node: string) {
    this._trace = node;
    this.svgNode.setAttribute('d', this.trace);
  }

  constructor(c: Coordinate) {
    super('path');
    this._trace = 'M ' + c.x + ' ' + c.y;
  }

  addPoint(c: Coordinate) {
    this.trace += ' L ' + c.x + ' ' + c.y;
  }

  updateProperties() {
    super.updateProperties();
    this._svgNode.style.fill = 'transparent';
    this._svgNode.style.strokeLinecap = 'round';
    this._svgNode.style.strokeLinejoin = 'round';
  }
}
