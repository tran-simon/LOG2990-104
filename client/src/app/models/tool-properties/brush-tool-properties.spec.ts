import { BrushTextureType } from 'src/app/models/tool-properties/brush-texture-type.enum';
import { BrushToolProperties } from 'src/app/models/tool-properties/brush-tool-properties';

describe('Brush Tool Properties', () => {
  let brushProperties: BrushToolProperties;

  beforeEach(() => {
    brushProperties = new BrushToolProperties();
  });

  it('should create with the default thickness', () => {
    expect(brushProperties.strokeWidth).toBe(BrushToolProperties.MIN_THICKNESS);
  });

  it('should create with the default texture', () => {
    expect(brushProperties.texture).toBe(BrushTextureType.TEXTURE_1);
  });
});
