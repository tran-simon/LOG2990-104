import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class Path extends BaseShape {
  static readonly PATH_STYLE: string = 'round';
  private _trace: string;
  private points: Coordinate[];

  get trace(): string {
    return this._trace;
  }

  set trace(node: string) {
    this._trace = node;
    this.svgNode.setAttribute('d', this.trace);
  }

  get width(): number {
    if (this.points.length > 0) {
      return Coordinate.maxArrayXYCoord(this.points).x - this.origin.x;
    } else {
      return 0;
    }
  }

  get height(): number {
    if (this.points.length > 0) {
      return Coordinate.maxArrayXYCoord(this.points).y - this.origin.y;
    } else {
      return 0;
    }
  }

  get origin(): Coordinate {
    if (this.points.length > 0) {
      return Coordinate.minArrayXYCoord(this.points);
    } else {
      return new Coordinate();
    }
  }
  set origin(c: Coordinate) {
    if (this.points.length > 0) {
      const delta = Coordinate.substract(c, this.origin);
      this.points.forEach((point, index) => {
        point = Coordinate.add(point, delta);
        this.points[index] = point;
        if (index === 0) {
          this._trace = 'M ' + point.x + ' ' + point.y; // todo - make function
        } else {
          this.trace += ' L ' + point.x + ' ' + point.y;
        }
      });
    }
  }

  constructor(c: Coordinate) {
    super('path');
    this.points = new Array<Coordinate>();
    this.points.push(c);
    this._trace = 'M ' + c.x + ' ' + c.y;
  }

  addPoint(c: Coordinate): void {
    this.points.push(c);
    this.trace += ' L ' + c.x + ' ' + c.y;
  }

  updateProperties(): void {
    super.updateProperties();

    this.svgNode.style.fill = Path.NO_STYLE;

    this.svgNode.style.stroke = this.primaryColor.rgbString;
    this.svgNode.style.strokeOpacity = this.primaryColor.a.toString();

    this.svgNode.style.strokeLinecap = Path.PATH_STYLE;
    this.svgNode.style.strokeLinejoin = Path.PATH_STYLE;
  }
}
