import { ToolType } from 'src/app/models/tools/tool-type.enum';
import { PenToolProperties } from './pen-tool-properties';

describe('Pen Tool Properties', () => {
  let penProperties: PenToolProperties;

  beforeEach(() => {
    penProperties = new PenToolProperties();
  });

  it('should have the correct tool type', () => {
    expect(penProperties.type).toBe(ToolType.Pen);
  });

  it('should create with the default thickness', () => {
    expect(penProperties.strokeWidth).toBe(PenToolProperties.MIN_THICKNESS);
  });
});
