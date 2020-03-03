import { MAX_POLY_EDGES, MIN_POLY_EDGES, Polygon } from './polygon';

describe('Polygon', () => {
  let polygon: Polygon;
  beforeEach(() => {
    polygon = new Polygon();
  });
  it('should create an instance', () => {
    expect(polygon).toBeTruthy();
  });
  it('should be at MIN_POLY_EDGE in lower edge case', () => {
    polygon.nEdges = 2;
    expect(polygon.nEdges).toBe(MIN_POLY_EDGES);
  });
  it('should be at MAX_POLY_EDGE in higher edge case', () => {
    polygon.nEdges = 13;
    expect(polygon.nEdges).toBe(MAX_POLY_EDGES);
  });
  it('should be at MIN_POLY_EDGE in unexpected cases', () => {
    polygon.nEdges = NaN;
    expect(polygon.nEdges).toBe(MIN_POLY_EDGES);
  });
  it('Should init with interiorAngle at 2Pi/3', () => {
    expect(polygon.interiorAngle).toBe((2 * Math.PI) / 3);
  });
  it('Should change internal angle on nEdges change', () => {
    const initialAngle = polygon.interiorAngle;
    polygon.nEdges = 6;
    expect(polygon.interiorAngle !== initialAngle).toBe(true);
    expect(polygon.interiorAngle).toBe(Math.PI / 3);
  });
  it('should have positive height value on negative input', () => {
    polygon.height = -1;
    expect(polygon.height).toBe(1);
  });
  it('should have positive width value on negative input', () => {
    polygon.width = -1;
    expect(polygon.width).toBe(1);
  });
  it('Should have is center at half width and half height', () => {
    polygon.width = 1;
    polygon.height = 1;
    expect(polygon.center.x).toBe(0.5);
    expect(polygon.center.y).toBe(0.5);
  });
});
