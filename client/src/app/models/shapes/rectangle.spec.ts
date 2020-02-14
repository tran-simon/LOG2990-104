import { Rectangle } from 'src/app/models/shapes/rectangle';

describe('Rectangle', () => {
  let rectangle: Rectangle;
  beforeEach(() => {
    rectangle = new Rectangle();
  });
  it('should init with width = 0', () => {
    expect(rectangle.width).toBe(0);
  });
  it('should init with height = 0', () => {
    expect(rectangle.height).toBe(0);
  });
  it('Should have height = 0 on invalid inputs', () => {
    rectangle.height = Number.NaN;
    expect(rectangle.height).toBe(0);
  });
  it('Should have width = 0 on invalid inputs', () => {
    rectangle.width = Number.NaN;
    expect(rectangle.width).toBe(0);
  });
  it('Should have positive height on negative values', () => {
    rectangle.height = -5;
    expect(rectangle.height).toBe(5);
  });
  it('Should have positive width on negative values', () => {
    rectangle.width = -5;
    expect(rectangle.width).toBe(5);
  });
  it('Should have center.x = 0 on init', () => {
    expect(rectangle.center.x).toBe(0);
  });
  it('Should have center.y = 0 on init', () => {
    expect(rectangle.center.y).toBe(0);
  });
  it('should create', () => {
    expect(rectangle).toBeTruthy();
  });
});
