import { CompositeLine } from 'src/app/models/shapes/composite-line';
import { LineJunctionType, LineToolProperties } from 'src/app/models/tool-properties/line-tool-properties';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { EditorService } from 'src/app/services/editor.service';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class LineTool extends CreatorTool<LineToolProperties> {
  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new LineToolProperties();
    this.lockMethod = this.calculateNoLock;

    this.keyboardListener.addEvent(KeyboardListener.getIdentifier('backspace'), () => {
      if (this.isActive) {
        this.shape.removeLastPoint();
      }
      return false;
    });

    this.keyboardListener.addEvent(KeyboardListener.getIdentifier('Shift', false, true), () => {
      this.lockMethod = this.determineLockMethod();
      this.shape.updateCurrentCoord(this.lockMethod(this.mousePosition));
      return false;
    });
    this.keyboardListener.addEvent(KeyboardListener.getIdentifier('Shift', false, false, 'keyup'), () => {
      this.lockMethod = this.calculateNoLock;
      this.shape.updateCurrentCoord(this.lockMethod(this.mousePosition));
      return false;
    });
    this.keyboardListener.addEvent(KeyboardListener.getIdentifier('escape'), () => {
      this.cancel();
      return false;
    });
  }
  static readonly MAX_HORIZONTAL_LOCK_ANGLE = Math.PI / 6;
  static readonly MAX_DIAGONAL_LOCK_ANGLE = Math.PI / 3;
  static readonly MAX_VERTICAL_LOCK_ANGLE = Math.PI / 2;
  shape: CompositeLine;

  private lockMethod: (c: Coordinate) => Coordinate;

  protected updateProperties(): void {
    if (this.shape) {
      this.shape.shapeProperties.strokeColor = this.editorService.colorsService.primaryColor;
      this.shape.shapeProperties.fillColor = this.editorService.colorsService.secondaryColor;
      this.shape.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;
      if (this.toolProperties.junctionType === LineJunctionType.POINTS) {
        this.shape.shapeProperties.thickness = this.toolProperties.junctionDiameter;
      } else {
        this.shape.shapeProperties.thickness = 0;
      }
      this.shape.updateProperties();
    }
  }

  createShape(): CompositeLine {
    return new CompositeLine(this.mousePosition);
  }

  handleMouseEvent(e: MouseEvent): void {
    super.handleMouseEvent(e);
    if (this.isActive) {
      if (e.type === 'dblclick') {
        this.shape.endLine(this.mousePosition);
        this.applyShape();
      } else if (e.type === 'mousemove') {
        this.shape.updateCurrentCoord(this.lockMethod(this.mousePosition));
      } else if (e.type === 'mousedown') {
        this.shape.confirmPoint();
      }
    } else if (e.type === 'mousedown') {
      this.shape = this.createShape();
      this.isActive = true;
      this.updateProperties();
      this.addShape();
    }
  }

  determineLockMethod(): (c: Coordinate) => Coordinate {
    if (this.isActive) {
      const angle = Math.abs(Coordinate.angle(this.shape.currentLine.startCoord, this.shape.currentLine.endCoord));
      if (angle <= LineTool.MAX_HORIZONTAL_LOCK_ANGLE) {
        return this.calculateHorizontalLock;
      } else if (angle <= LineTool.MAX_DIAGONAL_LOCK_ANGLE) {
        const deltaX = this.shape.currentLine.endCoord.x - this.shape.currentLine.startCoord.x;
        const deltaY = this.shape.currentLine.endCoord.y - this.shape.currentLine.startCoord.y;

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

  private readonly calculateHorizontalLock = (c: Coordinate): Coordinate => new Coordinate(c.x, this.shape.currentLine.startCoord.y);

  private readonly calculateVerticalLock = (c: Coordinate): Coordinate => new Coordinate(this.shape.currentLine.startCoord.x, c.y);

  private readonly calculatePositiveDiagonalLock = (c: Coordinate): Coordinate => {
    const deltaX = c.x - this.shape.currentLine.startCoord.x;
    return new Coordinate(c.x, this.shape.currentLine.startCoord.y + deltaX);
  };

  private readonly calculateNegativeDiagonalLock = (c: Coordinate): Coordinate => {
    const deltaX = c.x - this.shape.currentLine.startCoord.x;
    return new Coordinate(c.x, this.shape.currentLine.startCoord.y - deltaX);
  };

  private readonly calculateNoLock = (c: Coordinate): Coordinate => c;
}
