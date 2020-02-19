import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { BrushPath } from 'src/app/models/shapes/brush-path';
import { BrushToolProperties } from 'src/app/models/tool-properties/brush-tool-properties';
import { PenTool } from 'src/app/models/tools/creator-tools/stroke-tools/pen-tool';
import { ToolType } from 'src/app/models/tools/tool';
import { ColorsService } from 'src/app/services/colors.service';

export class BrushTool extends PenTool {
  toolProperties: BrushToolProperties;
  path: BrushPath;

  constructor(public selectedColors: ColorsService) {
    super(selectedColors, ToolType.Brush);
    this.toolProperties = new BrushToolProperties();
  }

  initPath(drawingSurface: DrawingSurfaceComponent): void {
    this.path = new BrushPath(this.mousePosition);

    this.path.shapeProperties.strokeColor = this.selectedColors.primaryColor;
    this.path.shapeProperties.strokeOpacity = this.selectedColors.primaryColor.a;
    this.path.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;
    this.path.changeFilter(this.toolProperties.texture);

    this.path.updateProperties();
    this.drawShape(drawingSurface);
    this.path.addPoint(this.mousePosition);
  }
}
