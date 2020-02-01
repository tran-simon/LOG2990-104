/**
 * Represents a color.
 * Values must be between 0 and 1
 */
import {MathUtil} from "../math/math-util";

export class Color {
  static RED = new Color(1);
  static GREEN = new Color(0, 1, 0);
  static BLUE = new Color(0, 0, 1);
  static WHITE = new Color(1, 1, 1);

  private readonly r: number;
  private readonly g: number;
  private readonly b: number;

  /**
   * Values must be in range 0 to 1
   * If not in range, values will be made to fit
   *
   * @param r red
   * @param g green
   * @param b blue
   */
  constructor(r = 0, g = 0, b = 0) {
    this.r = MathUtil.fit(r);
    this.g = MathUtil.fit(g);
    this.b = MathUtil.fit(b);
  }

  static color255(r255 = 0, g255 = 0, b255 = 0): Color {
    return new Color(r255 / 255, g255 / 255, b255 / 255);
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
   * Gets hue value from RGB color
   * Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma
   */
  get hue(): number | undefined {
    const M = Math.max(this.r, this.g, this.b);
    const m = Math.min(this.r, this.g, this.b);
    const C = M - m;

    let h: number | undefined;
    switch (M) {
      case this.r:
        h = ((this.g - this.b) / C) % 6;
        break;
      case this.g:
        h = (this.b - this.r) / C + 2;
        break;
      case this.b:
        h = (this.r - this.g) / C + 4;
        break;
    }
    return h ? 60 * h : undefined;
  }

  /**
   * Gets saturation from RGB color
   * Based on: https://en.wikipedia.org/wiki/HSL_and_HSV#Saturation
   */
  get saturation(): number {
    const M = Math.max(this.r, this.g, this.b);
    const m = Math.min(this.r, this.g, this.b);
    const C = M - m;
    const L = (M + m) / 2;

    if (L === 1 || L === 0) {
      return 0;
    } else {
      return C / (1 - Math.abs(2 * L - 1));
    }
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

  toHex(value: number): string {
    const stringValue = value.toString(16);
    return stringValue.length !== 1 ? stringValue : '0' + stringValue;
  }

  get hex(): string {
    const r = this.toHex(this.r255);
    const g = this.toHex(this.g255);
    const b = this.toHex(this.b255);

    return `0x${r}${g}${b}`;
  }

  get color255(){
    return
  }

  get rgbString(): string {
    return `rgb(${this.red * 255},${this.green * 255},${this.blue * 255})`;
  }

  get r255(): number {
    return Math.round(this.r * 255);
  }

  get g255(): number {
    return Math.round(this.g * 255);
  }

  get b255(): number {
    return Math.round(this.b * 255);
  }

  get red(): number {
    return this.r;
  }

  get green(): number {
    return this.g;
  }

  get blue(): number {
    return this.b;
  }
}


