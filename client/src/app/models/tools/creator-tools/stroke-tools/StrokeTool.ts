import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { Path } from 'src/app/models/Path';
import { CreatorTool } from 'src/app/models/tools/creator-tools/CreatorTool';
import { SelectedColorsService } from 'src/app/services/selected-colors.service';

export abstract class StrokeTool extends CreatorTool {
  abstract path: Path;
  abstract initPath(): void;

  constructor(drawingSurface: DrawingSurfaceComponent, protected selectedColors: SelectedColorsService) {
    super(drawingSurface);
  }

  get shape(): Path {
    return this.path;
  }

  handleToolMouseEvent(e: MouseEvent): void {
    if (this.isActive) {
      if (e.type === 'mouseup') {
        this.isActive = false;
      } else if (e.type === 'mousemove') {
        this.shape.addPoint(this.mousePosition);
      }
    } else if (e.type === 'mousedown') {
      this.initPath();
      this.isActive = true;
    }
  }
}
