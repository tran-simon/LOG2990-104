export const RGB_VALUE = 255;
export const DEFAULT_ALPHA_VALUE = 1;

export class Color {
    private red: number;

    get Red(): number {
        return !this.red ? RGB_VALUE : this.red;
    }

    set Red(red: number) {
        this.red = this.isValidColor(red) ? red : RGB_VALUE;
    }

    private green: number;

    get Green(): number {
        return !this.green ? RGB_VALUE : this.green;
    }

    set Green(green: number) {
        this.green = this.isValidColor(green) ? green : RGB_VALUE;
    }

    private blue: number;

    get Blue(): number {
        return !this.blue ? RGB_VALUE : this.blue;
    }

    set Blue(blue: number) {
        this.blue = this.isValidColor(blue) ? blue : RGB_VALUE;
    }

    private alpha: number;

    get Alpha(): number {
        return !this.alpha ? DEFAULT_ALPHA_VALUE : this.alpha;
    }

    set Alpha(alpha: number) {
        this.alpha = !!alpha && alpha >= 0 && alpha <= 1 ? alpha : DEFAULT_ALPHA_VALUE;
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
