import { LineToolProperties } from './line-tool-properties';

describe('Line Tool Properties', () => {
  let lineProperties: LineToolProperties;

  beforeEach(() => {
    lineProperties = new LineToolProperties();
  });

  it('should create with the default thickness', () => {
    expect(lineProperties.strokeWidth).toBe(LineToolProperties.MIN_THICKNESS);
  });

  it('should have the correct minimum diameter', () => {
    expect(lineProperties.minThickness).toBe(LineToolProperties.MIN_THICKNESS);
  });

  it('should have the correct maximum diameter', () => {
    expect(lineProperties.maxThickness).toBe(LineToolProperties.MAX_THICKNESS);
  });

  it('should correct a diameter input that is too low', () => {
    lineProperties.junctionDiameter = lineProperties.minDiameter - 1;
    expect(lineProperties.junctionDiameter).toEqual(lineProperties.minDiameter);
  });

  it('should correct a diameter input that is too high', () => {
    lineProperties.junctionDiameter = lineProperties.maxDiameter + 1;
    expect(lineProperties.junctionDiameter).toEqual(lineProperties.maxDiameter);
  });

  it('should keep a correct diameter input', () => {
    const correctValue = (lineProperties.maxDiameter - lineProperties.minDiameter) / 2 + lineProperties.minDiameter;
    lineProperties.junctionDiameter = correctValue;
    expect(lineProperties.junctionDiameter).toEqual(correctValue);
  });
});
