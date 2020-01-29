export class Color {
    r: number;
    g: number;
    b: number;
    a: number;
    hexValue: string;

    constructor(r: number = 255, g: number = 255, b: number = 255, a: number = 1) {
        this.r = this.getGoodColorValue(r);
        this.g = this.getGoodColorValue(g);
        this.b = this.getGoodColorValue(b);
        this.a = a >= 0.0 && a <= 1.0 ? a : 1.0;
    }

    getGoodColorValue(value: number): number {
        return value >= 0 && value <= 255 && value - Math.trunc(value) === 0 ? value : 255;
    }

    getHexValue(): string {
        return '#' + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
    }
}
