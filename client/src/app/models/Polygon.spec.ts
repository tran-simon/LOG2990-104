import { MAX_POLY_EDGE, MIN_POLY_EDGE, Polygon } from './Polygon';

describe('Polygon', () => {
  let polygon: Polygon;
  beforeEach(() => {
    polygon = new Polygon();
  });
  it('Should init at MIN_POLY_EDGE if left empty', () => {
    expect(polygon.NbEdge).toBe(MIN_POLY_EDGE);
  });
  it('Should init at MAX_POLY_EDGE if nEdge > MAX_POLY_EDGE', () => {
    polygon = new Polygon(13);
    expect(polygon.NbEdge).toBe(MAX_POLY_EDGE);
  });
  it('Should init at MIN_POLY_EDGE if nEdge < MAX_POLY_EDGE', () => {
    polygon = new Polygon(-1);
    expect(polygon.NbEdge).toBe(MIN_POLY_EDGE);
  });
  it('should create', () => {
    expect(polygon).toBeTruthy();
  });
});
