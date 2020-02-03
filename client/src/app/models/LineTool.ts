import { CreatorTool } from './CreatorTool';
import { Line } from './Line';

export class LineTool implements CreatorTool {
    buildShape(): Line {
        throw new Error('Method not implemented.');
    }

    handleMouseEvent(e: MouseEvent): void {
        throw new Error('Method not implemented.');
    }

    handleKeyboardEvent(e: KeyboardEvent): void {
        throw new Error('Method not implemented.');
    }
}
