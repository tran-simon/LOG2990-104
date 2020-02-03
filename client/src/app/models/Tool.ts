import { DrawingSurfaceComponent } from '../components/pages/editor/drawing-surface/drawing-surface.component';

export abstract class Tool {
    protected drawingSurface: DrawingSurfaceComponent;

    constructor(drawingSurface: DrawingSurfaceComponent) {
        this.drawingSurface = drawingSurface;
    }

    abstract handleMouseEvent(e: MouseEvent): void;
    abstract handleKeyboardEvent(e: KeyboardEvent): void;
}
