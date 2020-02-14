import { BrushPath } from 'src/app/models/shapes/brush-path';
import { BrushTextureType } from 'src/app/models/tool-properties/brush-tool-properties';
import { Coordinate } from 'src/app/utils/math/coordinate';

describe('Path', () => {
  let brush: BrushPath;
  beforeEach(() => {
    brush = new BrushPath(new Coordinate());
  });
  it('Should change filter', () => {
    let brushTexture: BrushTextureType;
    brushTexture = BrushTextureType.TEXTURE_3;
    brush.changeFilter(brushTexture);
    expect(brush.svgNode.getAttribute('filter')).toEqual('url(#TEXTURE_3)');
  });
});
