import { Line } from './Line';

describe('Line', () => {
    let line: Line;
    beforeEach(() => {
        line = new Line();
    });
    it('Should have center.x at 0 on init ', () => {
        expect(line.Center.x).toBe(0);
    });
    it('Should have center.y at 0 on init ', () => {
        expect(line.Center.y).toBe(0);
    });
    it('should create', () => {
        expect(line).toBeTruthy();
    });
});
