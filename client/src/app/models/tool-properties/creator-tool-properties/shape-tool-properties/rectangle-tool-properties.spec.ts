import { RectangleToolProperties } from '@tool-properties/creator-tool-properties/shape-tool-properties/rectangle-tool-properties';
import { ContourType } from 'src/app/models/tool-properties/creator-tool-properties/contour-type.enum';

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
