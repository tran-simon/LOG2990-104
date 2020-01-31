import { Ellipse } from './Ellipse';

describe('Ellipse', () => {
    let ellipse: Ellipse;
    beforeEach(() => {
        ellipse = new Ellipse();
    });
    it('Should init with radius rx =0, ry=0', () => {
        expect(ellipse.radiusX).toBe(0);
        expect(ellipse.radiusY).toBe(0);
    });
});
