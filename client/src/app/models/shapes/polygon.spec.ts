import { Coordinate } from '../../utils/math/coordinate';
import { Polygon } from './polygon';

describe('Polygon', () => {
  let polygon: Polygon;
  it('should create an instance', () => {
    polygon = new Polygon(new Coordinate());
    expect(polygon).toBeTruthy();
  });
});
