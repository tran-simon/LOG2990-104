import { Path } from 'src/app/models/shapes/path';
import { BrushTextureType } from 'src/app/models/tool-properties/brush-tool-properties';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class BrushPath extends Path {
  constructor(c: Coordinate) {
    super(c);
  }

  changeFilter(filter: BrushTextureType): void {
    switch (filter) {
      case BrushTextureType.TEXTURE_1:
        this._svgNode.setAttribute('filter', 'url(#TEXTURE_1)');
        break;
      case BrushTextureType.TEXTURE_2:
        this._svgNode.setAttribute('filter', 'url(#TEXTURE_2)');
        break;
      case BrushTextureType.TEXTURE_3:
        this._svgNode.setAttribute('filter', 'url(#TEXTURE_3)');
        break;
      case BrushTextureType.TEXTURE_4:
        this._svgNode.setAttribute('filter', 'url(#TEXTURE_4)');
        break;
      case BrushTextureType.TEXTURE_5:
        this._svgNode.setAttribute('filter', 'url(#TEXTURE_5)');
        break;
    }
  }
}
