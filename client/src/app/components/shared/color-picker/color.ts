/**
 * Represents a color.
 * Values must be between 0 and 1
 */
export class Color {
    static RED = new Color(1);
    static GREEN = new Color(0, 1, 0);
    static BLUE = new Color(0, 0, 1);

    private r = 0;
    private g = 0;
    private b = 0;

    /**
     * Values must be in range 0 to 1
     * @param r red
     * @param g green
     * @param b blue
     */
    constructor(r = 0, g = 0, b = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    /**
     * Creates a RGB color from HSL
     * based on: https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
     * @param H hue from 0 to 360
     * @param S Saturation from 0 to 1
     * @param L luminance from 0 to 1
     */
    static hsl(H: number, S: number, L: number) {
        const f = (n: number) => {
            const k = (n + H / 30) % 12;
            const a = S * Math.min(L, 1 - L);
            return L - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        };

        return new Color(f(0), f(8), f(4));
    }

    /**
     * Get HSL string `hsl(h,s%,l%)`
     * @param h hue (0 to 360)
     * @param s saturation (0 to 1)
     * @param l luminance (0 to 1)
     */
    static getHslString(h: number, s: number, l: number): string {
        return `hsl(${h},${s * 100}%,${l * 100}%)`;
    }

    get rgbString(): string {
        return `rgb(${this.red * 255}, ${this.green * 255}, ${this.blue * 255})`;
    }

    get red(): number {
        return this.r;
    }

    set red(value: number) {
        this.r = value;
    }

    get green(): number {
        return this.g;
    }

    set green(value: number) {
        this.g = value;
    }

    get blue(): number {
        return this.b;
    }

    set blue(value: number) {
        this.b = value;
    }
}
