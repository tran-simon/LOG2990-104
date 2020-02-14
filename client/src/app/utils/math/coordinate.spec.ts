import { Coordinate } from 'src/app/utils/math/coordinate';

describe('Coordinate', () => {
  let coordinate: Coordinate;
  beforeEach(() => {
    coordinate = new Coordinate();
  });
  it('should create at x = 0 ', () => {
    expect(coordinate.x).toBe(0.0);
  });
  it('should create at y = 0 ', () => {
    expect(coordinate.y).toBe(0.0);
  });
  it('should create', () => {
    expect(coordinate).toBeTruthy();
  });
});
