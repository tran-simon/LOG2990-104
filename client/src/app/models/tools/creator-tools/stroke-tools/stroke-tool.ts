import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { Path } from 'src/app/models/shapes/path';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { SelectedColorsService } from 'src/app/services/selected-colors.service';

export abstract class StrokeTool extends CreatorTool {
  abstract path: Path;
  constructor(drawingSurface: DrawingSurfaceComponent, protected selectedColors: SelectedColorsService) {
    super(drawingSurface);
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
      this.initPath();
      this.shape.addPoint(this.mousePosition);
      this.isActive = true;
    }
  }

  initPath(): void {
    this.path = new Path(this.mousePosition);

    this.path.properties.strokeColor = this.selectedColors.primaryColor;
    this.path.properties.strokeOpacity = this.selectedColors.primaryColor.a;

    this.path.updateProperties();
    this.drawShape();
  }
}
