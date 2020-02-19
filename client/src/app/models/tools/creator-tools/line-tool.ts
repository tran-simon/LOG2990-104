import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { CompositeLine } from 'src/app/models/shapes/composite-line';
import { LineJunctionType, LineToolProperties } from 'src/app/models/tool-properties/line-tool-properties';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { ToolType } from 'src/app/models/tools/tool';
import { ColorsService } from 'src/app/services/colors.service';
import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class LineTool extends CreatorTool {
  get shape(): CompositeLine {
    return this.line;
  }

  constructor(public selectedColors: ColorsService) {
    super(ToolType.Line);
    this.toolProperties = new LineToolProperties();
    this.lockMethod = this.calculateNoLock;

    this.keyboardEventHandler = {
      backspace: () => {
        if (this.isActive) {
          this.line.removeLastPoint();
        }
        return false;
      },
      escape: () => {
        if (this.isActive) {
          // this.cancelShape(this);//TODO : FIX
          this.isActive = false; // todo
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
  static readonly MAX_HORIZONTAL_LOCK_ANGLE = Math.PI / 6;
  static readonly MAX_DIAGONAL_LOCK_ANGLE = Math.PI / 3;
  static readonly MAX_VERTICAL_LOCK_ANGLE = Math.PI / 2;
  toolProperties: LineToolProperties;

  private line: CompositeLine;
  private lockMethod: (c: Coordinate) => Coordinate;

  initLine(drawingSurfaceComponent: DrawingSurfaceComponent): void {
    this.line = new CompositeLine(this.mousePosition);

    this.line.shapeProperties.strokeColor = this.selectedColors.primaryColor;
    this.line.shapeProperties.fillColor = this.selectedColors.secondaryColor;
    this.line.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;

    if (this.toolProperties.junctionType === LineJunctionType.POINTS) {
      this.line.shapeProperties.thickness = this.toolProperties.junctionDiameter;
    } else {
      this.line.shapeProperties.thickness = 0;
    }

    this.line.updateProperties();
    this.drawShape(drawingSurfaceComponent);
  }

  handleToolMouseEvent(e: MouseEvent, drawingSurfaceComponent: DrawingSurfaceComponent): void {
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
      this.initLine(drawingSurfaceComponent);
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

  private readonly calculateHorizontalLock = (c: Coordinate): Coordinate => new Coordinate(c.x, this.line.currentLine.startCoord.y);

  private readonly calculateVerticalLock = (c: Coordinate): Coordinate => new Coordinate(this.line.currentLine.startCoord.x, c.y);

  private readonly calculatePositiveDiagonalLock = (c: Coordinate): Coordinate => {
    const deltaX = c.x - this.line.currentLine.startCoord.x;
    return new Coordinate(c.x, this.line.currentLine.startCoord.y + deltaX);
  };

  private readonly calculateNegativeDiagonalLock = (c: Coordinate): Coordinate => {
    const deltaX = c.x - this.line.currentLine.startCoord.x;
    return new Coordinate(c.x, this.line.currentLine.startCoord.y - deltaX);
  };

  private readonly calculateNoLock = (c: Coordinate): Coordinate => c;
}
