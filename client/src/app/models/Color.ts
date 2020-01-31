export const DEFAULT_RGB_VALUE: number = 255;
export const DEFAULT_ALPHA_VALUE: number = 1;

export class Color {
    private r: number;
    private g: number;
    private b: number;
    private a: number;

    constructor(r: number = DEFAULT_RGB_VALUE, g: number = DEFAULT_RGB_VALUE, b: number = DEFAULT_RGB_VALUE, a: number = 1) {
        this.setR(r);
        this.setG(g);
        this.setB(b);
        this.a = a >= 0.0 && a <= 1.0 ? a : 1.0;
    }

    //Muttators
    setR(red: number): void {
        if (this.isValidColor(red)) {
            this.r = red;
        } else {
            this.r = DEFAULT_RGB_VALUE;
        }
    }

    setG(green: number): void {
        if (this.isValidColor(green)) {
            this.g = green;
        } else {
            this.g = DEFAULT_RGB_VALUE;
        }
    }

    setB(blue: number): void {
        if (this.isValidColor(blue)) {
            this.b = blue;
        } else {
            this.b = DEFAULT_RGB_VALUE;
        }
    }

    setA(alpha: number): void {
        if (alpha >= 0 && alpha <= 1) {
            this.a = alpha;
        } else {
            this.a = DEFAULT_ALPHA_VALUE;
        }
    }

    //Accessors
    getR(): number {
        if (this.r === null) {
            return DEFAULT_RGB_VALUE;
        } else {
            return this.r;
        }
    }

    getG(): number {
        if (this.g === null) {
            return DEFAULT_RGB_VALUE;
        } else {
            return this.g;
        }
    }

    getB(): number {
        if (this.b === null) {
            return DEFAULT_RGB_VALUE;
        } else {
            return this.b;
        }
    }

    getA(): number {
        if (this.a !== null) {
            return this.a;
        } else {
            return DEFAULT_ALPHA_VALUE;
        }
    }

    private isValidColor(value: number): boolean {
        return value >= 0 && value <= 255 && value - Math.trunc(value) === 0;
    }

    private toHexString(value: number): string {
        if (value.toString(16).length < 2) {
            return '0' + value.toString(16);
        } else {
            return value.toString(16);
        }
    }

    getHexValue(): string {
        return '#' + this.toHexString(this.getR()) + this.toHexString(this.getG()) + this.toHexString(this.getB());
    }
}
