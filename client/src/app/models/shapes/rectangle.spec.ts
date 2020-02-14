import { Rectangle } from 'src/app/models/shapes/rectangle';
import { Coordinate } from 'src/app/utils/math/coordinate';

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
  it('Should have positive height', () => {
    rectangle.height = -7;
    expect(rectangle.height).toEqual(7);
    expect(rectangle.svgNode.getAttribute('height')).toEqual('7');
  });
  it('Should have positive width', () => {
    rectangle.width = -10;
    expect(rectangle.width).toEqual(10);
    expect(rectangle.svgNode.getAttribute('width')).toEqual('10');
  });
  it('Should have the given coordinates', () => {
    const coord: Coordinate = new Coordinate(-50, 10);
    rectangle.origin = coord;
    expect(rectangle.origin).toEqual(coord);
    expect(rectangle.svgNode.getAttribute('x')).toEqual('-50');
    expect(rectangle.svgNode.getAttribute('y')).toEqual('10');
  });
  it('Should give you the center', () => {
    const centerX: number = rectangle.width / 2 + rectangle.origin.x;
    const centerY: number = rectangle.height / 2 + rectangle.origin.y;
    const coord: Coordinate = new Coordinate(centerX, centerY);
    expect(rectangle.center).toEqual(coord);
  });
});
