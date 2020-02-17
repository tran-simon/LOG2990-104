import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { Path } from 'src/app/models/shapes/path';
import { PenToolProperties } from 'src/app/models/tool-properties/pen-tool-properties';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { ToolType } from 'src/app/models/tools/tool';
import { SelectedColorsService } from 'src/app/services/selected-colors.service';

export class PenTool extends CreatorTool {
  toolProperties: PenToolProperties;

  path: Path;

  constructor(drawingSurface: DrawingSurfaceComponent, protected selectedColors: SelectedColorsService, type = ToolType.Pen) {
    super(drawingSurface, type);
    this.toolProperties = new PenToolProperties();
  }

  get shape(): Path {
    return this.path;
  }

  handleToolMouseEvent(e: MouseEvent): void {
    if (this.isActive) {
      if (e.type === 'mouseup' || e.type === 'mouseleave') {
        this.isActive = false;
      } else if (e.type === 'mousemove') {
        this.shape.addPoint(this.mousePosition);
      }
    } else if (e.type === 'mousedown') {
      this.isActive = true;
      this.initPath();
    }
  }

  initPath(): void {
    this.path = new Path(this.mousePosition);

    this.path.shapeProperties.strokeColor = this.selectedColors.primaryColor;
    this.path.shapeProperties.strokeOpacity = this.selectedColors.primaryColor.a;
    this.path.shapeProperties.strokeWidth = this.toolProperties.thickness;

    this.path.updateProperties();
    this.drawShape();
    this.path.addPoint(this.mousePosition);
  }
}
