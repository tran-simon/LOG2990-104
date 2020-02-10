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
    return new Coordinate(c1.x - c2.x, c1.y - c2.y);
  }

  static abs(c: Coordinate): Coordinate {
    return new Coordinate(Math.abs(c.x), Math.abs(c.y));
  }

  static minXYCoord(c1: Coordinate, c2: Coordinate): Coordinate {
    return new Coordinate(Math.min(c1.x, c2.x), Math.min(c1.y, c2.y));
  }

  static maxXYDistance(c1: Coordinate, c2: Coordinate): number {
    const xDistance = Math.abs(c1.x - c2.x);
    const yDistance = Math.abs(c1.y - c2.y);
    return xDistance > yDistance ? xDistance : yDistance;
  }

  static minXYDistance(c1: Coordinate, c2: Coordinate): number {
    const xDistance = Math.abs(c1.x - c2.x);
    const yDistance = Math.abs(c1.y - c2.y);
    return xDistance < yDistance ? xDistance : yDistance;
  }

  static angle(c1: Coordinate, c2: Coordinate): number {
    return Math.atan2(c1.y - c2.y, Math.abs(c1.x - c2.x));
  }
}
