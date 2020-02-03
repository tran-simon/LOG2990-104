import { Rectangle } from './Rectangle';

describe('Rectangle', () => {
  let rectangle: Rectangle;
  beforeEach(() => {
    rectangle = new Rectangle();
  });
  it('Should init as polygon with 4 edges', () => {
    expect(rectangle.NbEdge).toBe(4);
  });
  it('should init with width = 0', () => {
    expect(rectangle.Width).toBe(0);
  });
  it('should init with height = 0', () => {
    expect(rectangle.Height).toBe(0);
  });
  it('Should have height = 0 on invalid inputs', () => {
    rectangle.Height = Number.NaN;
    expect(rectangle.Height).toBe(0);
  });
  it('Should have width = 0 on invalid inputs', () => {
    rectangle.Width = Number.NaN;
    expect(rectangle.Width).toBe(0);
  });
  it('Should have positive height on negative values', () => {
    rectangle.Height = -5;
    expect(rectangle.Height).toBe(5);
  });
  it('Should have positive width on negative values', () => {
    rectangle.Width = -5;
    expect(rectangle.Width).toBe(5);
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
