export const RGB_VALUE = 255;
export const DEFAULT_ALPHA_VALUE = 1;

export class Color {
    private red: number;

    get Red(): number {
        if (this.red === null) {
            return RGB_VALUE;
        } else {
            return this.red;
        }
    }

    set Red(red: number) {
        if (this.isValidColor(red)) {
            this.red = red;
        } else {
            this.red = RGB_VALUE;
        }
    }

    private green: number;

    get Green(): number {
        if (this.green === null) {
            return RGB_VALUE;
        } else {
            return this.green;
        }
    }

    set Green(green: number) {
        if (this.isValidColor(green)) {
            this.green = green;
        } else {
            this.green = RGB_VALUE;
        }
    }

    private blue: number;

    get Blue(): number {
        if (this.blue === null) {
            return RGB_VALUE;
        } else {
            return this.blue;
        }
    }

    set Blue(blue: number) {
        if (this.isValidColor(blue)) {
            this.blue = blue;
        } else {
            this.blue = RGB_VALUE;
        }
    }

    private alpha: number;

    get Alpha(): number {
        if (this.alpha !== null) {
            return this.alpha;
        } else {
            return DEFAULT_ALPHA_VALUE;
        }
    }

    set Alpha(alpha: number) {
        if (alpha >= 0 && alpha <= 1) {
            this.alpha = alpha;
        } else {
            this.alpha = DEFAULT_ALPHA_VALUE;
        }
    }

    constructor(r: number = RGB_VALUE, g: number = RGB_VALUE, b: number = RGB_VALUE, a: number = DEFAULT_ALPHA_VALUE) {
        this.Red = r;
        this.Green = g;
        this.Blue = b;
        this.Alpha = a;
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
        return '#' + this.toHexString(this.Red) + this.toHexString(this.Green) + this.toHexString(this.Blue);
    }
}
