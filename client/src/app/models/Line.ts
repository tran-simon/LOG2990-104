import { BaseShape } from './BaseShape';
import { Coordinate } from './Coordinate';

export class Line extends BaseShape {
  constructor() {
    super();
  }

  get center(): Coordinate {
    if (!this.startCoord || !this.endCoord) {
      return this.origin;
    } else {
      return new Coordinate((this.startCoord.x + this.endCoord.x) / 2, (this.startCoord.y + this.endCoord.y) / 2);
    }
  }
}
