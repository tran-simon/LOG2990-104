import { DrawingSurfaceComponent } from '../components/pages/editor/drawing-surface/drawing-surface.component';
import { CreatorTool } from './CreatorTool';
import { Rectangle } from './Rectangle';

export class RectangleTool extends CreatorTool {
  private rectangle: Rectangle;

  get shape() {
    return this.rectangle;
  }

  constructor(drawingSurface: DrawingSurfaceComponent) {
    super(drawingSurface);
  }

  handleMouseEvent(e: MouseEvent): void {
    throw new Error('Method not implemented.');
  }
}
