import { Coordinate } from '../../utils/math/coordinate';
import { BaseShape } from './base-shape';
import { Particle } from './particle';

export class CompositeParticle extends BaseShape {
  particles: Particle[];
  isTimeOut: boolean;
  private timeout: number;

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

  constructor(origin: Coordinate = new Coordinate(), radius: number = 10) {
    super('g');
    this.radius = radius;
    this.origin = origin;
    this.particles = [];
    this.isTimeOut = false;
  }

  private genRandomPosition(c: Coordinate): Coordinate {
    const angle = Math.random() * (2 * Math.PI);
    const x = c.x + Math.random() * this.radius * Math.cos(angle);
    const y = c.y + Math.random() * this.radius * Math.sin(angle);
    return new Coordinate(x, y);
  }

  addParticle(c: Coordinate, frequency: number = 1): void {
    if (!this.isTimeOut) {
      this.isTimeOut = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        let particle: Particle;
        for (let i = 0; i < Math.floor(this.radius / 2); i++) {
          particle = new Particle(this.genRandomPosition(c));
          particle.shapeProperties.fillColor = this.shapeProperties.fillColor;
          particle.shapeProperties.strokeColor = this.shapeProperties.strokeColor;
          particle.radius = this.shapeProperties.thickness;
          particle.updateProperties();
          this.particles.push(particle);
          this.svgNode.appendChild(particle.svgNode);
          this.isTimeOut = false;
        }
      }, frequency);
    }
  }
}
