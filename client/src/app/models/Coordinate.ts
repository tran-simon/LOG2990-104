export class Coordinate {
  x: number;
  y: number;

  constructor(x: number = 0.0, y: number = 0.0) {
    this.x = x;
    this.y = y;
  }

  static add(c1: Coordinate, c2: Coordinate): Coordinate {
    return new Coordinate(c1.x + c2.x, c1.y + c2.y);
  }

  static substract(c1: Coordinate, c2: Coordinate): Coordinate {
    return new Coordinate(Math.abs(c1.x - c2.x), Math.abs(c1.y - c2.y));
  }

  static minXYCoord(c1: Coordinate, c2: Coordinate): Coordinate {
    return new Coordinate(Math.min(c1.x, c2.x), Math.min(c1.y, c2.y));
  }

  angle(c: Coordinate): number {
    return Math.atan2(c.y - this.y, Math.abs(c.x - this.x));
  }

  maxXYDistance(c: Coordinate): number {
    const xDistance = Math.abs(this.x - c.x);
    const yDistance = Math.abs(this.y - c.y);
    return xDistance > yDistance ? xDistance : yDistance;
  }

  minXYDistance(c: Coordinate): number {
    const xDistance = Math.abs(this.x - c.x);
    const yDistance = Math.abs(this.y - c.y);
    return xDistance < yDistance ? xDistance : yDistance;
  }
}
