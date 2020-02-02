import {Color} from './color';

describe('Color', () => {
  let colorFromHSL: Color;

  beforeEach(() => {
    colorFromHSL = Color.hsl(120, 0.5, 0.4);
  });

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

  it('can generate Hsl string', () => {

    const hslString = Color.getHslString(120, 0.5, 0.75);
    expect(hslString).toEqual('hsl(120,50%,75%)');
  });

  it('can get rgbString', () => {
    const rgbString = Color.RED.rgbString;
    expect(rgbString).toEqual('rgb(255,0,0)');
  });

  it('can calculate hue', () => {
    expect(colorFromHSL.hue).toBeCloseTo(120, 5);
  });
  it('can calculate saturation', () => {
    expect(colorFromHSL.saturation).toBeCloseTo(0.5, 5);
  });
  it('can calculate lightness', () => {
    expect(colorFromHSL.lightness).toBeCloseTo(0.4, 5)
  });

  it('can get hex value', () => {
    expect(Color.GREEN.hex).toEqual('#00ff00');
    expect(Color.GREEN.hexNoSharpSign).toEqual('00ff00');
  });

  it('can create color from hex', () => {
    const {red, green, blue} = Color.hex(colorFromHSL.hex);
    expect(red).toBeCloseTo(0.2, 5);
    expect(green).toBeCloseTo(0.6, 5);
    expect(blue).toBeCloseTo(0.2, 5);
  })
});
