import { Path } from 'src/app/models/shapes/path';
import { PenToolProperties } from 'src/app/models/tool-properties/pen-tool-properties';
import { StrokeTool } from 'src/app/models/tools/creator-tools/stroke-tools/stroke-tool';

export class PenTool extends StrokeTool {
  _toolProperties: PenToolProperties;
  path: Path;

  initPath(): void {
    super.initPath();
    this.path.properties.strokeWidth = this._toolProperties.thickness;
  }
}
