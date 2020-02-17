import { Ellipse } from 'src/app/models/shapes/ellipse';

describe('Ellipse', () => {
  let ellipse: Ellipse;
  beforeEach(() => {
    ellipse = new Ellipse();
  });
  it('Should have a x radius of 0 on init', () => {
    expect(ellipse.radiusX).toBe(0);
  });
  it('Should have a x radius of 0 on init', () => {
    expect(ellipse.radiusY).toBe(0);
  });
  it('Should have positive radiusX on negative input', () => {
    ellipse.radiusX = -5;
    expect(ellipse.radiusX).toBe(5);
  });
  it('Should have positive radiusY on negative input', () => {
    ellipse.radiusY = -5;
    expect(ellipse.radiusY).toBe(5);
  });
  it('Should have radiusX = 0 if invalid input', () => {
    ellipse.radiusX = Number.NaN;
    expect(ellipse.radiusX).toBe(0);
  });
  it('Should have radiusY = 0 if invalid input', () => {
    ellipse.radiusY = Number.NaN;
    expect(ellipse.radiusY).toBe(0);
  });
  it('Should have origin.x = 0 on init', () => {
    expect(ellipse.origin.x).toBe(0);
  });
  it('Should have origin.y = 0 on init', () => {
    expect(ellipse.origin.y).toBe(0);
  });
  it('should create', () => {
    expect(ellipse).toBeTruthy();
  });
});
