import { BaseShape } from './BaseShape';

describe('BaseShape', () => {
    let baseShape: BaseShape;
    beforeEach(() => {
        baseShape = new BaseShape();
    });
    it('Should be at origin (0,0) on init', () => {
        expect(baseShape.origin.x).toBe(0);
        expect(baseShape.origin.y).toBe(0);
    });
});
