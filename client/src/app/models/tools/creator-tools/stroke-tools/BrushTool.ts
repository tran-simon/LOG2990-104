import { BrushPath } from 'src/app/models/BrushPath';
import { BrushToolProperties } from 'src/app/models/ToolProperties/BrushToolProperties';
import { StrokeTool } from 'src/app/models/tools/creator-tools/stroke-tools/StrokeTool';

export class BrushTool extends StrokeTool {
  path: BrushPath;
  _toolProperties: BrushToolProperties;

  initPath(): void {
    this.path = new BrushPath(this.mousePosition);

    this.path.properties.strokeWidth = this._toolProperties.thickness;
    this.path.properties.strokeColor = this.selectedColors.primaryColor;
    this.path.properties.strokeOpacity = this.selectedColors.primaryColor.a;
    this.path.changeFilter(this._toolProperties.texture);

    this.path.updateProperties();
    this.drawShape();
  }
}
