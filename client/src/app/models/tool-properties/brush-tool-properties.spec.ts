import { BrushToolProperties } from 'src/app/models/tool-properties/brush-tool-properties';

describe('ToolbarComponent', () => {
  let brushProperties: BrushToolProperties;

  beforeEach(() => {
    brushProperties = new BrushToolProperties();
  });

  it('should have the correct tool name', () => {
    expect(brushProperties.toolName).toBe('Brush');
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
