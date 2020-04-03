import { BrushPath } from 'src/app/models/shapes/brush-path';
import { BrushTextureType } from 'src/app/models/tool-properties/creator-tool-properties/brush-texture-type.enum';
import { Coordinate } from 'src/app/utils/math/coordinate';

describe('Path', () => {
  let brush: BrushPath;
  beforeEach(() => {
    brush = new BrushPath(new Coordinate());
  });
  it('Should change filter', () => {
    let brushTexture: BrushTextureType;
    brushTexture = BrushTextureType.TEXTURE_1;
    brush.changeFilter(brushTexture);
    expect(brush.svgNode.getAttribute('filter')).toEqual('url(#TEXTURE_1)');
  });
  it('Should change filter', () => {
    let brushTexture: BrushTextureType;
    brushTexture = BrushTextureType.TEXTURE_2;
    brush.changeFilter(brushTexture);
    expect(brush.svgNode.getAttribute('filter')).toEqual('url(#TEXTURE_2)');
  });
  it('Should change filter', () => {
    let brushTexture: BrushTextureType;
    brushTexture = BrushTextureType.TEXTURE_3;
    brush.changeFilter(brushTexture);
    expect(brush.svgNode.getAttribute('filter')).toEqual('url(#TEXTURE_3)');
  });
  it('Should change filter', () => {
    let brushTexture: BrushTextureType;
    brushTexture = BrushTextureType.TEXTURE_4;
    brush.changeFilter(brushTexture);
    expect(brush.svgNode.getAttribute('filter')).toEqual('url(#TEXTURE_4)');
  });
  it('Should change filter', () => {
    let brushTexture: BrushTextureType;
    brushTexture = BrushTextureType.TEXTURE_5;
    brush.changeFilter(brushTexture);
    expect(brush.svgNode.getAttribute('filter')).toEqual('url(#TEXTURE_5)');
  });
});
