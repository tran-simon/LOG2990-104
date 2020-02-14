import { Coordinate } from './Coordinate';

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
  it('Should add coordinates', () => {
    let coord1: Coordinate = new Coordinate(23, -7);
    let coord2: Coordinate = new Coordinate(-9, 43);
    let expectedCoord: Coordinate = new Coordinate(14, 36);
    let coordSum: Coordinate = Coordinate.add(coord1, coord2);
    expect(coordSum).toEqual(expectedCoord);
  });
  it('Should substract second coordinate to first coordinate', () => {
    let coord1: Coordinate = new Coordinate(44, -9);
    let coord2: Coordinate = new Coordinate(7, -23);
    let expectedCoord: Coordinate = new Coordinate(37, 14);
    let coordSub: Coordinate = Coordinate.substract(coord1, coord2);
    expect(coordSub).toEqual(expectedCoord);
  });
  it('Should set coordinates to their absolute value', () => {
    let coord: Coordinate = new Coordinate(-9, 43);
    let expectedCoord: Coordinate = new Coordinate(9, 43);
    let coordAbs: Coordinate = Coordinate.abs(coord);
    expect(coordAbs).toEqual(expectedCoord);
  });
  it('Should return the minimum coordinates', () => {
    let coord1: Coordinate = new Coordinate(7, -23);
    let coord2: Coordinate = new Coordinate(3, 5);
    let expectedCoord: Coordinate = new Coordinate(3, -23);
    expect(Coordinate.minXYCoord(coord1, coord2)).toEqual(expectedCoord);
  });
  it('Should give the minimum distance between coordinates', () => {
    let coord1: Coordinate = new Coordinate(7, -23);
    let coord2: Coordinate = new Coordinate(3, 5);
    let expectedValue: number = 4;
    expect(Coordinate.minXYDistance(coord1, coord2)).toEqual(expectedValue);
  });
  it('Should give maximum distance between coordinates', () => {
    let coord1: Coordinate = new Coordinate(44, -9);
    let coord2: Coordinate = new Coordinate(7, -23);
    let expectedValue: number = 37;
    expect(Coordinate.maxXYDistance(coord1, coord2)).toEqual(expectedValue);
  });
  it('Should give angle between coordinates line and abscissa', () => {
    let coord1: Coordinate = new Coordinate(10, 5);
    let coord2: Coordinate = new Coordinate(8, 3);
    let expectedValue: number = Math.PI / 4;
    expect(Coordinate.angle(coord1, coord2)).toEqual(expectedValue);
  });
});
