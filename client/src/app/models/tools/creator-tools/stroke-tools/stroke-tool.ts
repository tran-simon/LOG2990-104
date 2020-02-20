import { Path } from '../../../shapes/path';
import { ToolProperties } from '../../../tool-properties/tool-properties';
import { CreatorTool } from '../creator-tool';

export abstract class StrokeTool<T = ToolProperties> extends CreatorTool<T> {
  protected path: Path;
  protected abstract initPath(): void;

  get shape(): Path {
    return this.path;
  }

  handleToolMouseEvent(e: MouseEvent): void {
    if (this.isActive) {
      if (e.type === 'mouseup' || e.type === 'mouseleave') {
        this.applyShape();
      } else if (e.type === 'mousemove') {
        this.shape.addPoint(this.mousePosition);
      }
    } else if (e.type === 'mousedown') {
      this.isActive = true;
      this.initPath();
    }
  }
}
