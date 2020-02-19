import { PenToolProperties } from './pen-tool-properties';

describe('Pen Tool Properties', () => {
  let penProperties: PenToolProperties;

  beforeEach(() => {
    penProperties = new PenToolProperties();
  });

  it('should have the correct tool name', () => {
    expect(penProperties.toolName).toBe('Pen');
  });

  it('should create with the default thickness', () => {
    expect(penProperties.strokeWidth).toBe(PenToolProperties.MIN_THICKNESS);
  });
});
