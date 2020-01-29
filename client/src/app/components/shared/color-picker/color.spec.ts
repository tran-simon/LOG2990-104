import { Color } from './color';

describe('Color', () => {
    const colorFromHSL = Color.hsl(120, 0.5, 0.5);

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
        expect(colorFromHSL.hue).toEqual(120);
    });
    it('can calculate saturation', () => {
        expect(colorFromHSL.saturation).toEqual(0.5);
    });

    it('can get hex value', () => {
        expect(Color.GREEN.hex).toEqual('0x00ff00');
    });
});
