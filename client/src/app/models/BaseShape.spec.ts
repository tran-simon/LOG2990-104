import { BaseShape } from './BaseShape';

describe('BaseShape', () => {
    let baseShape: BaseShape;
    beforeEach(() => {
        baseShape = new BaseShape();
    });
    it('Should have origin.x at 0 on init', () => {
        expect(baseShape.origin.x).toBe(0);
    });
    it('Should have origin.x at 0 on init', () => {
        expect(baseShape.origin.y).toBe(0);
    });
    it('should create', () => {
        expect(baseShape).toBeTruthy();
    });
});
