import { Color } from './Color';

describe('Color', () => {
    let color: Color;
    beforeEach(() => {
        color = new Color();
    });
    it('Should init at hex #ffffff', () => {
        expect(color.getHexValue()).toBe('#ffffff');
    });
    it('Should return 255 on negative input', () => {
        expect(color.getGoodColorValue(-1)).toBe(255);
    });
    it('Should return 255 on > 255 inputs', () => {
        expect(color.getGoodColorValue(256)).toBe(255);
    });
    it('Should return 255 on decimal inputs', () => {
        expect(color.getGoodColorValue(1.1)).toBe(255);
    });
});
