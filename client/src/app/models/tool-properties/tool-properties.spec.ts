import { ToolProperties } from './tool-properties';

class MockToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 50;

  minThickness: number = MockToolProperties.MIN_THICKNESS;
  maxThickness: number = MockToolProperties.MAX_THICKNESS;

  constructor(thickness: number = MockToolProperties.MIN_THICKNESS) {
    super('MockTool');

    this.thickness = thickness;
  }
}

describe('Tool Properties', () => {
  let toolProperties: MockToolProperties;

  beforeEach(() => {
    toolProperties = new MockToolProperties();
  });

  it('should have the correct tool name', () => {
    expect(toolProperties.toolName).toBe('MockTool');
  });

  it('should correct a thickness input that is too low', () => {
    toolProperties.thickness = toolProperties.minThickness - 1;
    expect(toolProperties.thickness).toEqual(toolProperties.minThickness);
  });

  it('should correct a thickness input that is too high', () => {
    toolProperties.thickness = toolProperties.maxThickness + 1;
    expect(toolProperties.thickness).toEqual(toolProperties.maxThickness);
  });

  it('should keep a correct thickness input', () => {
    const correctValue = (toolProperties.maxThickness - toolProperties.minThickness) / 2 + toolProperties.minThickness;
    toolProperties.thickness = correctValue;
    expect(toolProperties.thickness).toEqual(correctValue);
  });

  it('should return the correct minimum thickness', () => {
    expect(toolProperties.minThickness).toBe(MockToolProperties.MIN_THICKNESS);
  });

  it('should return the correct maximum thickness', () => {
    expect(toolProperties.maxThickness).toBe(MockToolProperties.MAX_THICKNESS);
  });
});
