/**
 * Represents a color.
 * Values must be between 0 and 1
 */
import { MathUtil } from '../math/math-util';

export class Color {
  static RED = new Color(1);
  static GREEN = new Color(0, 1, 0);
  static BLUE = new Color(0, 0, 1);
  static WHITE = new Color(1, 1, 1);

  private readonly _red: number;
  private readonly _green: number;
  private readonly _blue: number;

  /**
   * Values must be in range 0 to 1
   * If not in range, values will be made to fit
   */
  constructor(r = 0, g = 0, b = 0) {
    this._red = MathUtil.fit(r);
    this._green = MathUtil.fit(g);
    this._blue = MathUtil.fit(b);
  }

  /**
   * Creates a color from hex string
   */
  static hex(hexString: string): Color {
    const r = parseInt(hexString.substr(0, 2), 16);
    const g = parseInt(hexString.substr(2, 2), 16);
    const b = parseInt(hexString.substr(4, 2), 16);
    return Color.color255(r, g, b);
  }

  /**
   * Creates a color from values between 0 and 255
   */
  static color255(r255 = 0, g255 = 0, b255 = 0): Color {
    return new Color(r255 / 255, g255 / 255, b255 / 255);
  }

  /**
   * Creates a RGB color from HSL
   * based on: https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
   * @param H hue from 0 to 360
   * @param S Saturation from 0 to 1
   * @param L lightness from 0 to 1
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
   * Gets hue value from RGB color
   * Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma
   */
  get hue(): number {
    const M = Math.max(this._red, this._green, this._blue);
    const m = Math.min(this._red, this._green, this._blue);
    const C = M - m;

    let h: number | undefined;
    switch (M) {
      case this._red:
        h = ((this._green - this._blue) / C) % 6;
        break;
      case this._green:
        h = (this._blue - this._red) / C + 2;
        break;
      case this._blue:
        h = (this._red - this._green) / C + 4;
        break;
    }
    return h ? 60 * h : 0;
  }

  /**
   * Gets saturation from RGB color
   * Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Saturation
   */
  get saturation(): number {
    const M = Math.max(this._red, this._green, this._blue);
    const m = Math.min(this._red, this._green, this._blue);
    const C = M - m;
    const L = (M + m) / 2;

    if (L === 1 || L === 0) {
      return 0;
    } else {
      return C / (1 - Math.abs(2 * L - 1));
    }
  }

  /**
   * Gets lightness from RGB color
   * Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Saturation
   */
  get lightness(): number {
    const M = Math.max(this._red, this._green, this._blue);
    const m = Math.min(this._red, this._green, this._blue);
    return (M + m) / 2;
  }

  /**
   * Get HSL string `hsl(h,s%,l%)`
   * @param h hue (0 to 360)
   * @param s saturation (0 to 1)
   * @param l lightness (0 to 1)
   */
  static getHslString(h: number, s: number, l: number): string {
    return `hsl(${h},${s * 100}%,${l * 100}%)`;
  }

  /**
   * Get hex string `#FFFFFF`
   */
  get hexString(): string {
    return '#' + this.hex;
  }

  get hex(): string {
    const r = this.r255.toString(16).padStart(2, '0');
    const g = this.g255.toString(16).padStart(2, '0');
    const b = this.b255.toString(16).padStart(2, '0');
    return `${r}${g}${b}`;
  }

  get color255(): Color255 {
    return { red: this.r255, green: this.g255, blue: this.b255 };
  }

  get rgbString(): string {
    return `rgb(${this.red * 255},${this.green * 255},${this.blue * 255})`;
  }

  get r255(): number {
    return Math.round(this._red * 255);
  }

  get g255(): number {
    return Math.round(this._green * 255);
  }

  get b255(): number {
    return Math.round(this._blue * 255);
  }

  get red(): number {
    return this._red;
  }

  get green(): number {
    return this._green;
  }

  get blue(): number {
    return this._blue;
  }
}

export interface Color255 {
  readonly red: number;
  readonly green: number;
  readonly blue: number;
}
