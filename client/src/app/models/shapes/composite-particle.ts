import { Coordinate } from '../../utils/math/coordinate';
import { BaseShape } from './base-shape';
import { Rectangle } from './rectangle';

export class CompositeParticle extends BaseShape {
  // todo: copy for composite particle
  get copy(): CompositeParticle {
    const copy = new CompositeParticle(this.radius);
    this.cloneProperties(copy);
    return copy;
  }
  static readonly PARTICLE_RADIUS: number = 4;
  private readonly particles: Rectangle[];

  private _radius: number;
  get radius(): number {
    return this._radius;
  }
  set radius(r: number) {
    this._radius = !r ? 1 : Math.abs(r);
  }

  get width(): number {
    return this.particles.length > 0 ? Coordinate.maxArrayXYCoord(this.particles.map((shape) => shape.end)).x - this.relativeOrigin.x : 0;
  }

  get height(): number {
    return this.particles.length > 0 ? Coordinate.maxArrayXYCoord(this.particles.map((shape) => shape.end)).y - this.relativeOrigin.y : 0;
  }

  private get relativeOrigin(): Coordinate {
    return this.particles.length > 0 ? Coordinate.minArrayXYCoord(this.particles.map((shape) => shape.origin)) : new Coordinate();
  }

  get origin(): Coordinate {
    return Coordinate.add(this.relativeOrigin, this.offset);
  }
  set origin(c: Coordinate) {
    this.offset = Coordinate.substract(c, this.relativeOrigin);
    this.applyTransform();
  }

  constructor(radius: number = 1) {
    super('g');
    this.particles = [];
    this.radius = radius;
  }

  cloneProperties(shape: CompositeParticle): void {
    super.cloneProperties(shape);
    this.particles.forEach((particle: Rectangle) => {
      const copy = particle.copy;
      shape.particles.push(copy);
      shape.svgNode.appendChild(copy.svgNode);
    });
  }

  private genRandomPosition(c: Coordinate): Coordinate {
    const angle = Math.random() * (2 * Math.PI);
    const x = c.x + Math.random() * this.radius * Math.cos(angle);
    const y = c.y + Math.random() * this.radius * Math.sin(angle);
    return new Coordinate(x, y);
  }

  addParticle(c: Coordinate = new Coordinate(), frequency: number = 1): void {
    let particle: Rectangle;
    for (let i = 0; i < (frequency || 1); i++) {
      particle = new Rectangle(this.genRandomPosition(c), CompositeParticle.PARTICLE_RADIUS);
      particle.primaryColor = this.primaryColor;
      particle.secondaryColor = this.primaryColor;
      this.particles.push(particle);
      this.svgNode.appendChild(particle.svgNode);
      particle.updateProperties();
    }
  }

  updateProperties(): void {
    super.updateProperties();
    if (this.particles) {
      this.particles.forEach((particle: Rectangle) => particle.updateProperties());
    }
  }
}
