import { Coordinate } from './Coordinate';
import { Polygon } from './Polygon';

export class Rectangle extends Polygon {
  private height: number;

  get Height(): number {
    return this.height;
  }

  set Height(height: number) {
    this.height = !height ? 0 : Math.abs(height);
  }

  private width: number;

  get Width(): number {
    return this.width;
  }

  set Width(width: number) {
    this.width = !width ? 0 : Math.abs(width);
  }

  constructor(width: number = 0, height: number = 0) {
    super(4);
    this.Width = width;
    this.Height = height;
  }

  get center(): Coordinate {
    return new Coordinate(this.origin.x + this.Width / 2, this.origin.y + this.Height / 2);
  }
}
