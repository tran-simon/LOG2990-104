import { BrushPath } from './BrushPath';
import { Coordinate } from './Coordinate';
import { BrushTextureType } from './ToolProperties/BrushToolProperties';
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
