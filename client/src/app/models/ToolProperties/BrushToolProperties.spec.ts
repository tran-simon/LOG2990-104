import { Color } from 'src/app/utils/color/color';
import { BrushToolProperties } from './BrushToolProperties';

describe('ToolbarComponent', () => {
  let brushProperties: BrushToolProperties;
  let primaryColor: Color;
  let secondaryColor: Color;

  beforeEach(() => {
    primaryColor = Color.WHITE;
    secondaryColor = Color.BLACK;

    brushProperties = new BrushToolProperties(primaryColor, secondaryColor);
  });

  it('should have the correct tool name', () => {
    expect(brushProperties.toolName).toBe('Brush');
  });

  it('should have the correct primary color', () => {
    expect(brushProperties.primaryColor).toBe(primaryColor);
  });

  it('should have the correct secondary color', () => {
    expect(brushProperties.secondaryColor).toBe(secondaryColor);
  });

  it('should correct a thickness input that is too low', () => {
    brushProperties.thickness = brushProperties.minThickness - 1;
    expect(brushProperties.thickness).toEqual(brushProperties.minThickness);
  });

  it('should correct a thickness input that is too high', () => {
    brushProperties.thickness = brushProperties.maxThickness + 1;
    expect(brushProperties.thickness).toEqual(brushProperties.maxThickness);
  });

  it('should keep a correct thickness input', () => {
    const correctValue = (brushProperties.maxThickness - brushProperties.minThickness) / 2 + brushProperties.minThickness;
    brushProperties.thickness = correctValue;
    expect(brushProperties.thickness).toEqual(correctValue);
  });
});
