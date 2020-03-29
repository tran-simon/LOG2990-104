import { CreatorToolProperties } from 'src/app/models/tool-properties/creator-tool-properties/creator-tool-properties';

class CreatorToolPropertiesMock extends CreatorToolProperties {
  static readonly MIN_THICKNESS: number = 1;
  static readonly MAX_THICKNESS: number = 50;

  minThickness: number = CreatorToolPropertiesMock.MIN_THICKNESS;
  maxThickness: number = CreatorToolPropertiesMock.MAX_THICKNESS;

  constructor(thickness: number = CreatorToolPropertiesMock.MIN_THICKNESS) {
    super();
    this.strokeWidth = thickness;
  }
}

describe('Creator Tool Properties', () => {
  let toolProperties: CreatorToolPropertiesMock;

  beforeEach(() => {
    toolProperties = new CreatorToolPropertiesMock();
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
    expect(toolProperties.minThickness).toBe(CreatorToolPropertiesMock.MIN_THICKNESS);
  });

  it('should return the correct maximum thickness', () => {
    expect(toolProperties.maxThickness).toBe(CreatorToolPropertiesMock.MAX_THICKNESS);
  });
});
