import { Coordinate } from '../../utils/math/coordinate';
import { BaseShape } from './base-shape';
import { Rectangle } from './rectangle';

export class CompositeParticle extends BaseShape {
  particles: Rectangle[];

  private _radius: number;
  get radius(): number {
    return this._radius;
  }
  set radius(r: number) {
    this._radius = !r ? 1 : Math.abs(r);
  }

  private _frequency: number;
  get frequency(): number {
    return this._frequency;
  }
  set frequency(frequency: number) {
    this._frequency = !frequency ? 1 : Math.abs(Math.floor(frequency));
  }

  get height(): number {
    return 0; // ToDO
  }

  get width(): number {
    return 0; // ToDO
  }

  get origin(): Coordinate {
    return this._origin;
  }
  set origin(c: Coordinate) {
    this._origin = c;
  }

  constructor(origin: Coordinate = new Coordinate(), radius: number = 1) {
    super('g');
    this.radius = radius;
    this.origin = origin;
    this.particles = [];
  }

  private genRandomPosition(c: Coordinate): Coordinate {
    const angle = Math.random() * (2 * Math.PI);
    const x = c.x + Math.random() * this.radius * Math.cos(angle);
    const y = c.y + Math.random() * this.radius * Math.sin(angle);
    return new Coordinate(x, y);
  }

  addParticle(c: Coordinate = new Coordinate()): void {
    let particle: Rectangle;
    for (let i = 0; i < this.frequency; i++) {
      particle = new Rectangle(this.genRandomPosition(c), this.shapeProperties.thickness);
      particle.shapeProperties.primaryColor = this.shapeProperties.primaryColor;
      particle.shapeProperties.secondaryColor = this.shapeProperties.primaryColor;
      particle.updateProperties();
      this.particles.push(particle);
      this.svgNode.appendChild(particle.svgNode);
    }
  }
}
