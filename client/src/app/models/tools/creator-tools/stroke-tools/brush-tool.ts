import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { BrushPath } from 'src/app/models/shapes/brush-path';
import { BrushToolProperties } from 'src/app/models/tool-properties/brush-tool-properties';
import { PenTool } from 'src/app/models/tools/creator-tools/stroke-tools/pen-tool';
import { SelectedColorsService } from 'src/app/services/selected-colors.service';

export class BrushTool extends PenTool {
  path: BrushPath;
  _toolProperties: BrushToolProperties;

  constructor(drawingSurface: DrawingSurfaceComponent, selectedColors: SelectedColorsService) {
    super(drawingSurface, selectedColors);
    this._toolProperties = new BrushToolProperties();
  }

  initPath(): void {
    this.path = new BrushPath(this.mousePosition);

    this.path.properties.strokeColor = this.selectedColors.primaryColor;
    this.path.properties.strokeOpacity = this.selectedColors.primaryColor.a;
    this.path.properties.strokeWidth = this._toolProperties.thickness;
    this.path.changeFilter(this._toolProperties.texture);

    this.path.updateProperties();
    this.drawShape();
    this.path.addPoint(this.mousePosition);
  }
}
