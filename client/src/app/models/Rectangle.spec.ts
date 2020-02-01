import { Coordinate } from './Coordinate';
import { Rectangle } from './Rectangle';

describe('Rectangle', () => {
    let rectangle: Rectangle;
    beforeEach(() => {
        rectangle = new Rectangle();
    });
    it('Should init as polygon of 4 edges', () => {
        expect(rectangle.nEdge).toBe(4);
    });
    it('Should return (+width,+height) if startCoordinate is topLeft of endCoordinate', () => {
        rectangle.startCoordinate = new Coordinate(1, 1);
        rectangle.endCoordinate = new Coordinate(3, 3);
        expect(rectangle.getWidth()).toBeGreaterThan(0);
        expect(rectangle.getHeight()).toBeGreaterThan(0);
    });
    it('Should return (-width,+height) if startCoordinate is topRight of endCoordinate', () => {
        rectangle.startCoordinate = new Coordinate(1, 1);
        rectangle.endCoordinate = new Coordinate(-3, 3);
        expect(rectangle.getWidth()).toBeLessThan(0);
        expect(rectangle.getHeight()).toBeGreaterThan(0);
    });
    it('Should return (+width,-height) if startCoordinate is BottomLeft of endCoordinate', () => {
        rectangle.startCoordinate = new Coordinate(1, 1);
        rectangle.endCoordinate = new Coordinate(3, -3);
        expect(rectangle.getWidth()).toBeGreaterThan(0);
        expect(rectangle.getHeight()).toBeLessThan(0);
    });
    it('Should return (-width,-height) if startCoordinate is BottomRight of endCoordinate', () => {
        rectangle.startCoordinate = new Coordinate(1, 1);
        rectangle.endCoordinate = new Coordinate(-3, -3);
        expect(rectangle.getWidth()).toBeLessThan(0);
        expect(rectangle.getHeight()).toBeLessThan(0);
    });
});
