import { Color, DEFAULT_ALPHA_VALUE, RGB_VALUE } from './Color';

describe('Color', () => {
    let color: Color;
    beforeEach(() => {
        color = new Color();
    });
    it('Should be red at DEFAULT_RGB_VALUE on init', () => {
        color = new Color();
        expect(color.Red).toBe(RGB_VALUE);
    });
    it('Should be green at DEFAULT_RGB_VALUE and DEFAULT_ALPHA_VALUE on init', () => {
        color = new Color();
        expect(color.Green).toBe(RGB_VALUE);
    });
    it('Should be blue at DEFAULT_RGB_VALUE and DEFAULT_ALPHA_VALUE on init', () => {
        color = new Color();
        expect(color.Blue).toBe(RGB_VALUE);
    });
    it('Should be DEFAULT_RGB_VALUE and DEFAULT_ALPHA_VALUE on init', () => {
        color = new Color();
        expect(color.Alpha).toBe(DEFAULT_ALPHA_VALUE);
    });
    it('Should be red at DEFAULT_RGB_VALUE if input out of range', () => {
        color = new Color(256, 0, 0, 1);
        expect(color.Red).toBe(RGB_VALUE);
    });
    it('Should be green at DEFAULT_RGB_VALUE if input out of range', () => {
        color = new Color(0, -1, 0, 1);
        expect(color.Green).toBe(RGB_VALUE);
    });
    it('Should be blue at DEFAULT_RGB_VALUE if input out of range', () => {
        color = new Color(0, 0, 255.1, 1);
        expect(color.Blue).toBe(RGB_VALUE);
    });
    it('Should be DEFAULT_ALPHA_VALUE if alpha input is out of range', () => {
        color = new Color(0, 0, 0, -4);
        expect(color.Alpha).toBe(DEFAULT_ALPHA_VALUE);
    });
    it('Should init at hex #ffffff', () => {
        expect(color.getHexValue()).toBe('#ffffff');
    });
    it('Should return #0R0G0B on inputs lesser than 2 bytes', () => {
        color = new Color(15, 15, 15, 1);
        expect(color.getHexValue()).toBe('#0f0f0f');
    });
    it('should create', () => {
        expect(color).toBeTruthy();
    });
});
