import { Path } from 'src/app/models/shapes/path';
import { BrushTextureType } from 'src/app/models/tool-properties/creator-tool-properties/brush-texture-type.enum';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class BrushPath extends Path {
  private _filter: BrushTextureType;
  get copy(): BrushPath {
    const copy = new BrushPath(this.points[0]);
    this.cloneProperties(copy);
    return copy;
  }

  set filter(filter: BrushTextureType) {
    this._filter = filter;
    switch (this._filter) {
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
  get filter(): BrushTextureType {
    return this._filter;
  }

  cloneProperties(shape: BrushPath): void {
    super.cloneProperties(shape);
    shape.updateProperties();
  }

  constructor(c: Coordinate = new Coordinate(), filter: BrushTextureType = BrushTextureType.TEXTURE_1, id?: number) {
    super(c, id);
    this._filter = filter;
  }

  readElement(json: string): void {
    super.readElement(json);
    const data = JSON.parse(json) as this;
    this.filter = data._filter;
    this.applyTransform();
  }
}
