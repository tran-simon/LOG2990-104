import { Ellipse } from './Ellipse';

describe('Ellipse', () => {
    let ellipse: Ellipse;
    beforeEach(() => {
        ellipse = new Ellipse();
    });
    it('Should return 0 on negative inputs', () => {
        expect(ellipse.getGoodRadius(-1)).toBe(0);
    });
});
