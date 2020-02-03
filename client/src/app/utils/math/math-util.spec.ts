import { MathUtil } from './math-util';

describe('MathUtil', () => {
    it('can fit', () => {
        expect(MathUtil.fit(10, 3, 7)).toEqual(7);
        expect(MathUtil.fit(7, 3, 7)).toEqual(7);
        expect(MathUtil.fit(5, 3, 7)).toEqual(5);
        expect(MathUtil.fit(3, 3, 7)).toEqual(3);
        expect(MathUtil.fit(-3, 3, 7)).toEqual(3);
    });
});
