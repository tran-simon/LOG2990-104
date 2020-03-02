import { ToolType } from 'src/app/models/tools/tool-type';
import { ToolProperties } from './tool-properties';

class MockToolProperties extends ToolProperties {
  static readonly MIN_THICKNESS = 1;
  static readonly MAX_THICKNESS = 50;

  minThickness: number = MockToolProperties.MIN_THICKNESS;
  maxThickness: number = MockToolProperties.MAX_THICKNESS;

  constructor(thickness: number = MockToolProperties.MIN_THICKNESS) {
    super('MockTool' as ToolType);

    this.strokeWidth = thickness;
  }
}

describe('Tool Properties', () => {
  let toolProperties: MockToolProperties;

  beforeEach(() => {
    toolProperties = new MockToolProperties();
  });

  it('should have the correct tool type', () => {
    expect(toolProperties.type).toBe('MockTool' as ToolType);
  });

  it('should correct a thickness input that is too low', () => {
    toolProperties.strokeWidth = toolProperties.minThickness - 1;
    expect(toolProperties.strokeWidth).toEqual(toolProperties.minThickness);
  });

  it('should correct a thickness input that is too high', () => {
    toolProperties.strokeWidth = toolProperties.maxThickness + 1;
    expect(toolProperties.strokeWidth).toEqual(toolProperties.maxThickness);
  });

  it('should keep a correct thickness input', () => {
    const correctValue = (toolProperties.maxThickness - toolProperties.minThickness) / 2 + toolProperties.minThickness;
    toolProperties.strokeWidth = correctValue;
    expect(toolProperties.strokeWidth).toEqual(correctValue);
  });

  it('should return the correct minimum thickness', () => {
    expect(toolProperties.minThickness).toBe(MockToolProperties.MIN_THICKNESS);
  });

  it('should return the correct maximum thickness', () => {
    expect(toolProperties.maxThickness).toBe(MockToolProperties.MAX_THICKNESS);
  });
});
