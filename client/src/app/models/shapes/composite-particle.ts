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

  get width(): number {
    if (this.particles.length > 0) {
      return Coordinate.maxArrayXYCoord(this.particles.map((shape) => shape.end)).x - this.origin.x;
    } else {
      return 0;
    }
  }

  get height(): number {
    if (this.particles.length > 0) {
      return Coordinate.maxArrayXYCoord(this.particles.map((shape) => shape.end)).y - this.origin.y;
    } else {
      return 0;
    }
  }

  get origin(): Coordinate {
    if (this.particles.length > 0) {
      return Coordinate.minArrayXYCoord(this.particles.map((shape) => shape.origin));
    } else {
      return new Coordinate();
    }
  }
  set origin(c: Coordinate) {
    if (this.particles.length > 0) {
      const delta = Coordinate.substract(c, this.origin);
      this.particles.forEach((shape) => {
        shape.origin = Coordinate.add(shape.origin, delta);
      });
    }
  }

  constructor(radius: number = 1) {
    super('g');
    this.particles = [];
    this.radius = radius;
  }

  private genRandomPosition(c: Coordinate): Coordinate {
    const angle = Math.random() * (2 * Math.PI);
    const x = c.x + Math.random() * this.radius * Math.cos(angle);
    const y = c.y + Math.random() * this.radius * Math.sin(angle);
    return new Coordinate(x, y);
  }

  addParticle(c: Coordinate = new Coordinate(), frequency: number = 1): void {
    let particle: Rectangle;
    for (let i = 0; i < frequency; i++) {
      particle = new Rectangle(this.genRandomPosition(c), this.thickness);
      particle.primaryColor = this.primaryColor;
      particle.secondaryColor = this.primaryColor;
      particle.updateProperties();
      this.particles.push(particle);
      this.svgNode.appendChild(particle.svgNode);
    }
  }
}
