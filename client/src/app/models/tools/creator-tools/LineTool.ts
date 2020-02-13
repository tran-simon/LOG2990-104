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

  get shape(): CompositeLine {
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
        return false;
      },
      delete: () => {
        if (this.isActive) {
          this.cancelShape();
        }
        return false;
      },
      shift_shift: () => {
        this.lockMethod = this.determineLockMethod();
        this.line.updateCurrentCoord(this.lockMethod(this.mousePosition));
        return false;
      },
      shift_up: () => {
        this.lockMethod = this.calculateNoLock;
        this.line.updateCurrentCoord(this.lockMethod(this.mousePosition));
        return false;
      },
    } as KeyboardEventHandler;
  }

  handleToolMouseEvent(e: MouseEvent) {
    if (this.isActive) {
      if (e.type === 'dblclick') {
        this.isActive = false;
        this.line.endLine(this.mousePosition);
      } else if (e.type === 'mousemove') {
        this.line.updateCurrentCoord(this.lockMethod(this.mousePosition));
      } else if (e.type === 'mousedown') {
        this.line.confirmPoint();
      }
    } else if (e.type === 'mousedown') {
      this.isActive = true;
      this.line = new CompositeLine(this.mousePosition);
      this.drawShape();
    }
  }

  determineLockMethod(): (c: Coordinate) => Coordinate {
    if (this.isActive) {
      const angle = Math.abs(Coordinate.angle(this.line.currentLine.startCoord, this.line.currentLine.endCoord));
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
    return new Coordinate(c.x, this.line.currentLine.startCoord.y);
  }

  calculateVerticalLock(c: Coordinate): Coordinate {
    return new Coordinate(this.line.currentLine.startCoord.x, c.y);
  }

  calculatePositiveDiagonalLock(c: Coordinate): Coordinate {
    const deltaX = c.x - this.line.currentLine.startCoord.x;
    return new Coordinate(c.x, this.line.currentLine.startCoord.y + deltaX);
  }

  calculateNegativeDiagonalLock(c: Coordinate): Coordinate {
    const deltaX = c.x - this.line.currentLine.startCoord.x;
    return new Coordinate(c.x, this.line.currentLine.startCoord.y - deltaX);
  }

  calculateNoLock(c: Coordinate): Coordinate {
    return c;
  }
}
