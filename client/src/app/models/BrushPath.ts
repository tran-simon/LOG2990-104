import { Coordinate } from './Coordinate';
import { Path } from './Path';
import { BrushTextureType } from './ToolProperties/BrushToolProperties';

export class BrushPath extends Path {
  svgFilters: SVGFilterElement[];

  constructor(c: Coordinate /*, filters: SVGFilterElement[]*/) {
    super(c);
    // this.svgFilters = filters;
  }

  changeFilter(filter: BrushTextureType) {
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
