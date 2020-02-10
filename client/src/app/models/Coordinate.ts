export class Coordinate {
  x: number;
  y: number;

  constructor(x: number = 0.0, y: number = 0.0) {
    this.x = x;
    this.y = y;
  }

  angle(c: Coordinate): number {
    return Math.atan2(c.y - this.y, Math.abs(c.x - this.x));
  }

  maxXYDistance(c: Coordinate): number {
    const xDistance = Math.abs(this.x - c.x);
    const yDistance = Math.abs(this.y - c.y);
    return xDistance > yDistance ? xDistance : yDistance;
  }
}
