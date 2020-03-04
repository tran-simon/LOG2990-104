import { Coordinate } from '../../utils/math/coordinate';
import { BaseShape } from './base-shape';
import { Particle } from './particle';

export const MAX_PARTICLES_COUNT = 10000;

export class CompositeParticle extends BaseShape {
  particles: Particle[];

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

  constructor(origin = new Coordinate()) {
    super('circle');
    this.origin = origin;
    this.particles = [];
  }

  private genRandomPosition(): Coordinate {
    const x = Math.random() * this.radius * Math.cos(Math.random() * (2 * Math.PI));
    const y = Math.random() * this.radius * Math.sin(Math.random() * (2 * Math.PI));
    return new Coordinate(x, y);
  }

  updateProperties(): void {
    if (this.particles) {
      for (const p of this.particles) {
        p.shapeProperties.strokeColor = this.shapeProperties.strokeColor;
        p.shapeProperties.strokeOpacity = this.shapeProperties.strokeColor.a;
        p.shapeProperties.strokeWidth = 0;
        p.radius = this.shapeProperties.thickness;
        p.updateProperties();
      }
    }
  }

  addParticle(frequency: number): void {
    if (this.particles.length < MAX_PARTICLES_COUNT) {
      const particle = new Particle(this.genRandomPosition());
      this.particles.push(particle);
      this.updateProperties();
      this.svgNode.appendChild(particle.svgNode);
    }
  }
}
