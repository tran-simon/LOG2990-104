import { Coordinate } from '../../utils/math/coordinate';
import { BaseShape } from './base-shape';
import { Particle } from './particle';

export class CompositeParticle extends BaseShape {
  particles: Particle[];

  private _radius: number;
  get radius(): number {
    return this._radius;
  }
  set radius(r: number) {
    this._radius = !r ? 1 : Math.abs(r);
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

  updateProperties(): void {
    if (this.particles) {
      this.particles.forEach((particle) => {
        particle.shapeProperties.fillColor = this.shapeProperties.fillColor;
        particle.radius = this.shapeProperties.thickness;
        particle.updateProperties();
      });
    }
  }

  addParticle(c: Coordinate): void {
    const particle = new Particle(this.genRandomPosition(c));
    this.particles.push(particle);
    this.svgNode.appendChild(particle.svgNode);
  }
}
