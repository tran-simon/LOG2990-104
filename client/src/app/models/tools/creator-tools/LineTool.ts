import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';
import { DrawingSurfaceComponent } from '../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { CompositeLine } from '../../CompositeLine';
import { Coordinate } from '../../Coordinate';
import { CreatorTool } from './CreatorTool';

export class LineTool extends CreatorTool {
  static readonly MAX_HORIZONTAL_LOCK_ANGLE = Math.PI / 6;
  static readonly MAX_DIAGONAL_LOCK_ANGLE = Math.PI / 3;
  static readonly MAX_VERTICAL_LOCK_ANGLE = Math.PI / 2;

  private line: CompositeLine;
  private lockMethod: (c: Coordinate) => Coordinate;

  get shape() {
    return this.line;
  }

  constructor(drawingSurface: DrawingSurfaceComponent) {
    super(drawingSurface);
    this.lockMethod = this.calculateNoLock;

    this.keyboardEventHandler = {
      backspace: () => {
        if (this.isActive) {
          this.line.removeLastPoint();
        }
        return true;
      },
      delete: () => {
        if (this.isActive) {
          this.cancelShape();
        }
        return true;
      },
      shift_shift: () => {
        this.lockMethod = this.determineLockMethod();
        this.line.updateCurrentCoord(this.lockMethod(this.line.currentLine.endCoord));
        return false;
      },
      shift_up: () => {
        this.lockMethod = this.calculateNoLock; // todo - update on shift up (before mousemove)
        return false;
      },
    } as KeyboardEventHandler;
  }

  handleMouseEvent(e: MouseEvent) {
    // todo - make a proper mouse manager
    const mouseCoord = new Coordinate(e.offsetX, e.offsetY);

    if (this.isActive) {
      if (e.type === 'dblclick') {
        this.isActive = false;
        this.line.endLine(mouseCoord);
      } else if (e.type === 'mousemove') {
        this.line.updateCurrentCoord(this.lockMethod(mouseCoord));
      } else if (e.type === 'mousedown') {
        this.line.confirmPoint();
      }
    } else if (e.type === 'mousedown') {
      this.isActive = true;
      this.line = new CompositeLine(mouseCoord);
      this.drawShape();
    }
  }

  determineLockMethod(): (c: Coordinate) => Coordinate {
    if (this.isActive) {
      const angle = Math.abs(this.line.currentLine.startCoord.angle(this.line.currentLine.endCoord));
      console.log(angle);
      if (angle <= LineTool.MAX_HORIZONTAL_LOCK_ANGLE) {
        return this.calculateHorizontalLock;
      } else if (angle <= LineTool.MAX_DIAGONAL_LOCK_ANGLE) {
        const deltaX = this.line.currentLine.endCoord.x - this.line.currentLine.startCoord.x;
        const deltaY = this.line.currentLine.endCoord.y - this.line.currentLine.startCoord.y;

        if ((deltaX > 0 && deltaY > 0) || (deltaX < 0 && deltaY < 0)) {
          return this.calculatePositiveDiagonalLock;
        } else {
          return this.calculateNegativeDiagonalLock;
        }
      } else if (angle <= LineTool.MAX_VERTICAL_LOCK_ANGLE) {
        return this.calculateVerticalLock;
      }
    }
    return this.calculateNoLock;
  }

  calculateHorizontalLock(c: Coordinate): Coordinate {
    c.y = this.line.currentLine.startCoord.y;
    return c;
  }

  calculateVerticalLock(c: Coordinate): Coordinate {
    c.x = this.line.currentLine.startCoord.x;
    return c;
  }

  calculatePositiveDiagonalLock(c: Coordinate): Coordinate {
    const deltaX = c.x - this.line.currentLine.startCoord.x;
    c.y = this.line.currentLine.startCoord.y + deltaX;
    return c;
  }

  calculateNegativeDiagonalLock(c: Coordinate): Coordinate {
    const deltaX = c.x - this.line.currentLine.startCoord.x;
    c.y = this.line.currentLine.startCoord.y - deltaX;
    return c;
  }

  calculateNoLock(c: Coordinate) {
    return c;
  }
}
