import { BrushPath } from 'src/app/models/shapes/brush-path';
import { BrushToolProperties } from 'src/app/models/tool-properties/brush-tool-properties';
import { StrokeTool } from 'src/app/models/tools/creator-tools/stroke-tools/stroke-tool';

export class BrushTool extends StrokeTool {
  path: BrushPath;
  _toolProperties: BrushToolProperties;

  initPath(): void {
    super.initPath();
    this.path.properties.strokeWidth = this._toolProperties.thickness;
    this.path.changeFilter(this._toolProperties.texture);
  }
}
