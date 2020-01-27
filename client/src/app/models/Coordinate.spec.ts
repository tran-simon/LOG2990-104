import {Coordinate} from './Coordinate';


describe('Coordinate', () => {
  let coordinate: Coordinate;

  it('should create at (0,0)', () => {
    coordinate = new Coordinate();
    expect(coordinate.x).toBe(0.0);
    expect(coordinate.y).toBe(0.0);
  });
});
