import { Color } from './color';

describe('Color', () => {
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

    // todo test rgbString
});
