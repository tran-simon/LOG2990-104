import { CreatorTool } from './CreatorTool';
import { Rectangle } from './Rectangle';

export class RectangleTool implements CreatorTool {
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
