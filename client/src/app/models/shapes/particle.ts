import { Coordinate } from '../../utils/math/coordinate';
import { BaseShape } from './base-shape';
// Could potentially be replaced by Ellipse
export class Particle extends BaseShape {
  private _radius: number;
  get radius(): number {
    return this._radius;
  }
  set radius(r: number) {
    this._radius = !r ? 0.5 : Math.abs(r);
    this.svgNode.setAttribute('r', this.radius.toString());
  }

  get origin(): Coordinate {
    return this._origin;
  }
  set origin(c: Coordinate) {
    this._origin = c;
    this.svgNode.setAttribute('x', this._origin.x.toString());
    this.svgNode.setAttribute('y', this._origin.y.toString());
  }

  constructor(origin = new Coordinate(), radius: number = 0.5) {
    super('circle');
    this.origin = origin;
    this.radius = radius;
  }
}
