import { Color, DEFAULT_ALPHA_VALUE, DEFAULT_RGB_VALUE } from './Color';

describe('Color', () => {
    let color: Color;
    beforeEach(() => {
        color = new Color();
    });
    it('Should be DEFAULT_RGB_VALUE and DEFAULT_ALPHA_VALUE on init', () => {
        color = new Color();
        expect(color.getR()).toBe(DEFAULT_RGB_VALUE);
        expect(color.getG()).toBe(DEFAULT_RGB_VALUE);
        expect(color.getB()).toBe(DEFAULT_RGB_VALUE);
        expect(color.getA()).toBe(DEFAULT_ALPHA_VALUE);
    });
    it('Should be DEFAULT_RGB_VALUE if inputs out of range', () => {
        color = new Color(256, -1, 255.1, 1);
        expect(color.getR()).toBe(DEFAULT_RGB_VALUE);
        expect(color.getG()).toBe(DEFAULT_RGB_VALUE);
        expect(color.getB()).toBe(DEFAULT_RGB_VALUE);
        expect(color.getA()).toBe(DEFAULT_ALPHA_VALUE);
    });
    it('Should be DEFAULT_ALPHA_VALUE if alpha input is out of range', () => {
        color = new Color(255, 255, 255, -4);
        expect(color.getA()).toBe(DEFAULT_ALPHA_VALUE);
    });
    it('Should init at hex #ffffff', () => {
        expect(color.getHexValue()).toBe('#ffffff');
    });
    it('Should return #0R0G0B on inputs lesser than 2 bytes', () => {
        color = new Color(15, 15, 15, 1);
        expect(color.getHexValue()).toBe('#0f0f0f');
    });
});
