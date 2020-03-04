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

  constructor(origin: Coordinate = new Coordinate(), radius: number = 30) {
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
        particle.shapeProperties.strokeWidth = 0;
        particle.radius = this.shapeProperties.thickness / 10;
        particle.updateProperties();
      });
    }
  }

  addParticle(c: Coordinate, frequency: number): void {
    let particle: Particle;
    for (let i = 0; i < frequency; i++) {
      particle = new Particle(this.genRandomPosition(c));
      this.svgNode.appendChild(particle.svgNode);
      this.particles.push(particle);
    }
  }
}
