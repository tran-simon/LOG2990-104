import { Ellipse } from './Ellipse';

describe('Ellipse', () => {
    let ellipse: Ellipse;
    beforeEach(() => {
        ellipse = new Ellipse();
    });
    it('Should have a x radius of 0 on init', () => {
        expect(ellipse.radiusX).toBe(0);
    });
    it('Should have a x radius of 0 on init', () => {
        expect(ellipse.radiusY).toBe(0);
    });
    it('Should have center.x = 0 on init', () => {
        expect(ellipse.Center.x).toBe(0);
    });
    it('Should have center.y = 0 on init', () => {
        expect(ellipse.Center.y).toBe(0);
    });
    it('should create', () => {
        expect(ellipse).toBeTruthy();
    });
});
