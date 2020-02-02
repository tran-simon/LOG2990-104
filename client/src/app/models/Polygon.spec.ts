import { MIN_POLY_EDGE, Polygon } from './Polygon';

describe('Polygon', () => {
    let polygon: Polygon;
    beforeEach(() => {
        polygon = new Polygon();
    });
    it('Should init at MIN_POLY_EDGE if left empty', () => {
        expect(polygon.nEdge).toBe(MIN_POLY_EDGE);
    });
    it('Should init at MIN_POLY_EDGE if nEdge > MAX_POLY_EDGE', () => {
        polygon = new Polygon(13);
        expect(polygon.nEdge).toBe(MIN_POLY_EDGE);
    });
    it('should create', () => {
        expect(polygon).toBeTruthy();
    });
});
