import { DrawingSurfaceComponent } from '../components/pages/editor/drawing-surface/drawing-surface.component';
import { CreatorTool } from './CreatorTool';
import { Rectangle } from './Rectangle';

export class RectangleTool extends CreatorTool {
  constructor(drawingSurface: DrawingSurfaceComponent) {
    super(drawingSurface);
  }

  buildShape(): Rectangle {
    throw new Error('Method not implemented.');
  }

  handleMouseEvent(e: MouseEvent): void {
    throw new Error('Method not implemented.');
  }

  handleKeyboardEvent(e: KeyboardEvent): void {
    throw new Error('Method not implemented.');
  }
}
