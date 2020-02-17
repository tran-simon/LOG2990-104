import { RectangleContourType, RectangleToolProperties } from './rectangle-tool-properties';

describe('Rectangle Tool Properties', () => {
  let rectangleProperties: RectangleToolProperties;

  beforeEach(() => {
    rectangleProperties = new RectangleToolProperties();
  });

  it('should have the correct tool name', () => {
    expect(rectangleProperties.toolName).toBe('Rectangle');
  });

  it('should create with the default thickness', () => {
    expect(rectangleProperties.thickness).toBe(RectangleToolProperties.MIN_THICKNESS);
  });

  it('should create with the default contour', () => {
    expect(rectangleProperties.contourType).toBe(RectangleContourType.FILLEDCONTOUR);
  });
});
