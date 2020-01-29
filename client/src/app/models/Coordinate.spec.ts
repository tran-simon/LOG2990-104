import { Coordinate } from './Coordinate';

describe('Coordinate', () => {
    let coordinate: Coordinate;
    beforeEach(() => {
        coordinate = new Coordinate();
    });
    it('should create at P(x=0,y=0)', () => {
        expect(coordinate.x).toBe(0.0);
        expect(coordinate.y).toBe(0.0);
    });
});
