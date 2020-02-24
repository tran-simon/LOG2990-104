import { ToolType } from '../tools/tool';
import { RectangleContourType, RectangleToolProperties } from './rectangle-tool-properties';

describe('Rectangle Tool Properties', () => {
  let rectangleProperties: RectangleToolProperties;

  beforeEach(() => {
    rectangleProperties = new RectangleToolProperties();
  });

  it('should have the correct tool type', () => {
    expect(rectangleProperties.type).toBe(ToolType.Rectangle);
  });

  it('should create with the default thickness', () => {
    expect(rectangleProperties.strokeWidth).toBe(RectangleToolProperties.MIN_THICKNESS);
  });

  it('should create with the default contour', () => {
    expect(rectangleProperties.contourType).toBe(RectangleContourType.FILLEDCONTOUR);
  });
});
