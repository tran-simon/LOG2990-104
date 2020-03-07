import { Coordinate } from '../../utils/math/coordinate';
import { BaseShape } from './base-shape';
// Could potentially be replaced by Ellipse
export class Particle extends BaseShape {
  private _radius: number;
  get radius(): number {
    return this._radius;
  }
  set radius(r: number) {
    this._radius = !r ? 1 : Math.abs(r);
    this.svgNode.setAttribute('width', this.radius.toString());
    this.svgNode.setAttribute('height', this.radius.toString());
  }

  get origin(): Coordinate {
    return this._origin;
  }
  set origin(c: Coordinate) {
    this._origin = c;
    this.svgNode.setAttribute('x', this._origin.x.toString());
    this.svgNode.setAttribute('y', this._origin.y.toString());
  }

  constructor(origin = new Coordinate(), radius: number = 1) {
    super('rect');
    this.radius = radius;
    this.origin = origin;
    this.updateProperties();
  }
}
