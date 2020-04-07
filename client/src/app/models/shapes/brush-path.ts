import { Path } from 'src/app/models/shapes/path';
import { BrushTextureType } from 'src/app/models/tool-properties/creator-tool-properties/brush-texture-type.enum';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class BrushPath extends Path {
  readonly filter: BrushTextureType;

  constructor(c: Coordinate, filter: BrushTextureType = BrushTextureType.TEXTURE_1) {
    super(c);
    this.filter = filter;
  }

  protected cloneProperties(shape: BrushPath): void {
    super.cloneProperties(shape);
    shape.changeFilter(this.filter);
  }

  get copy(): BrushPath {
    const copy = new BrushPath(this.points[0]);
    this.cloneProperties(copy);
    copy.updateProperties();
    return copy;
  }

  changeFilter(filter: BrushTextureType): void {
    switch (filter) {
      case BrushTextureType.TEXTURE_1:
        this.svgNode.setAttribute('filter', 'url(#TEXTURE_1)');
        break;
      case BrushTextureType.TEXTURE_2:
        this.svgNode.setAttribute('filter', 'url(#TEXTURE_2)');
        break;
      case BrushTextureType.TEXTURE_3:
        this.svgNode.setAttribute('filter', 'url(#TEXTURE_3)');
        break;
      case BrushTextureType.TEXTURE_4:
        this.svgNode.setAttribute('filter', 'url(#TEXTURE_4)');
        break;
      case BrushTextureType.TEXTURE_5:
        this.svgNode.setAttribute('filter', 'url(#TEXTURE_5)');
        break;
    }
  }
}
