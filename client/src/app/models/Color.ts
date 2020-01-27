export class Color {
  r: number;
  g: number;
  b: number;
  a: number;
  hexValue: string;

  constructor(r: number = 255, g: number = 255, b: number = 255, a: number = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  getHexValue(): string {
    return '#' + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
  }
}
