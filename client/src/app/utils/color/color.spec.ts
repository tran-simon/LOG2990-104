import { Color, ColorComponents } from './color';

describe('Color', () => {
  const colorFromRGB = Color.rgb255(51, 153, 51);

  it('can create red color from HSL', () => {
    const color = Color.hsl(0, 1, 0.5);
    expect(color).toEqual(Color.RED);
  });
  it('can create green color from HSL', () => {
    const color = Color.hsl(120, 1, 0.5);
    expect(color).toEqual(Color.GREEN);
  });

  it('can create blue color from HSL', () => {
    const color = Color.hsl(240, 1, 0.5);
    expect(color).toEqual(Color.BLUE);
  });

  it('can create color from RGB', () => {
    const color = Color.rgb(1, 0, 0);
    expect(color).toEqual(Color.hsl(0, 1, 0.5));
  });

  it('can generate Hsl string', () => {
    const hslString = Color.hsl(120, 0.5, 0.4).hslString;
    expect(hslString).toEqual('hsl(120, 50%, 40%)');
  });

  it('can create color from rgb components between 0 to 255', () => {
    expect(Color.rgb255(270, 0, -5)).toEqual(Color.rgb(1, 0, 0));
  });

  it('can get color with rgb components between 0 and 255', () => {
    const color: ColorComponents = {
      r: 0,
      g: 0,
      b: 255,
      h: 240,
      s: 1,
      l: 0.5,
      a: 1,
    };
    expect(Color.BLUE.color255).toEqual(color);
  });

  it('can get rgbString', () => {
    const rgbString = Color.RED.rgbString;
    expect(rgbString).toEqual('rgb(255, 0, 0)');
  });

  it('can calculate hue', () => {
    expect(colorFromRGB.h).toBeCloseTo(120, 5);
  });
  it('can calculate saturation', () => {
    expect(colorFromRGB.s).toBeCloseTo(0.5, 5);
  });
  it('can calculate lightness', () => {
    expect(colorFromRGB.l).toBeCloseTo(0.4, 5);
  });

  it('can get hex value', () => {
    expect(Color.GREEN.hex).toEqual('00ff00');
    expect(Color.GREEN.hexString).toEqual('#00ff00');
  });

  it('can create color from hex', () => {
    const { r, g, b } = Color.hex(colorFromRGB.hex);
    expect(r).toBeCloseTo(0.2, 5);
    expect(g).toBeCloseTo(0.6, 5);
    expect(b).toBeCloseTo(0.2, 5);
  });

  it('can get negative color', () => {
    expect(Color.WHITE.negative).toEqual(Color.BLACK);
    expect(Color.RED.negative).toEqual(Color.rgb(0, 1, 1));
  });

  it('can define color with transparency', () => {
    const color = Color.hsl(120, 0.5, 0.5, 0.4);
    expect(color.a).toEqual(0.4);
  });
});
