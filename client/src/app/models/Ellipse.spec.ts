import { Ellipse } from './Ellipse';

describe('Ellipse', () => {
  let ellipse: Ellipse;
  beforeEach(() => {
    ellipse = new Ellipse();
  });
  it('Should have a x radius of 0 on init', () => {
    expect(ellipse.RadiusX).toBe(0);
  });
  it('Should have a x radius of 0 on init', () => {
    expect(ellipse.RadiusY).toBe(0);
  });
  it('Should have positive radiusX on negative input', () => {
    ellipse.RadiusX = -5;
    expect(ellipse.RadiusX).toBe(5);
  });
  it('Should have positive radiusY on negative input', () => {
    ellipse.RadiusY = -5;
    expect(ellipse.RadiusY).toBe(5);
  });
  it('Should have radiusX = 0 if invalid input', () => {
    ellipse.RadiusX = Number.NaN;
    expect(ellipse.RadiusX).toBe(0);
  });
  it('Should have radiusY = 0 if invalid input', () => {
    ellipse.RadiusY = Number.NaN;
    expect(ellipse.RadiusY).toBe(0);
  });
  it('Should have center.x = 0 on init', () => {
    expect(ellipse.center.x).toBe(0);
  });
  it('Should have center.y = 0 on init', () => {
    expect(ellipse.center.y).toBe(0);
  });
  it('should create', () => {
    expect(ellipse).toBeTruthy();
  });
});
