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
    it('Should return +width if startCoordinate is topLeft of endCoordinate', () => {
        rectangle.startCoordinate = new Coordinate(1, 1);
        rectangle.endCoordinate = new Coordinate(3, 3);
        expect(rectangle.Width).toBeGreaterThan(0);
    });
    it('Should return +height if startCoordinate is topLeft of endCoordinate', () => {
        rectangle.startCoordinate = new Coordinate(1, 1);
        rectangle.endCoordinate = new Coordinate(3, 3);
        expect(rectangle.Height).toBeGreaterThan(0);
    });
    it('Should return -width if startCoordinate is BottomRight of endCoordinate', () => {
        rectangle.startCoordinate = new Coordinate(1, 1);
        rectangle.endCoordinate = new Coordinate(-3, -3);
        expect(rectangle.Width).toBeLessThan(0);
    });
    it('Should return -height if startCoordinate is BottomRight of endCoordinate', () => {
        rectangle.startCoordinate = new Coordinate(1, 1);
        rectangle.endCoordinate = new Coordinate(-3, -3);
        expect(rectangle.Height).toBeLessThan(0);
    });
    it('should create', () => {
        expect(rectangle).toBeTruthy();
    });
});
