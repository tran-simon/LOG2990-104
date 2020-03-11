import { ContourType } from 'src/app/models/tool-properties/contour-type.enum';
import { RectangleToolProperties } from './rectangle-tool-properties';

describe('Rectangle Tool Properties', () => {
  let rectangleProperties: RectangleToolProperties;

  beforeEach(() => {
    rectangleProperties = new RectangleToolProperties();
  });

  it('should create with the default thickness', () => {
    expect(rectangleProperties.strokeWidth).toBe(RectangleToolProperties.MIN_THICKNESS);
  });

  it('should create with the default contour', () => {
    expect(rectangleProperties.contourType).toBe(ContourType.FILLED_CONTOUR);
  });
});
