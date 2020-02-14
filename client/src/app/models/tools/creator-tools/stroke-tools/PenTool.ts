import { Path } from 'src/app/models/Path';
import { PenToolProperties } from 'src/app/models/ToolProperties/PenToolProperties';
import { StrokeTool } from 'src/app/models/tools/creator-tools/stroke-tools/StrokeTool';

export class PenTool extends StrokeTool {
  _toolProperties: PenToolProperties;
  path: Path;

  initPath(): void {
    this.path = new Path(this.mousePosition);

    this.path.properties.strokeWidth = this._toolProperties.thickness;
    this.path.properties.strokeColor = this.selectedColors.primaryColor;
    this.path.properties.strokeOpacity = this.selectedColors.primaryColor.a;

    this.path.updateProperties();
    this.drawShape();
  }
}
