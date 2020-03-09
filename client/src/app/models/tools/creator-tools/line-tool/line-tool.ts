import { CompositeLine } from 'src/app/models/shapes/composite-line';
import { LineJunctionType } from 'src/app/models/tool-properties/line-junction-type.enum';
import { LineToolProperties } from 'src/app/models/tool-properties/line-tool-properties';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { EditorService } from 'src/app/services/editor.service';
import { KeyboardListenerService } from 'src/app/services/event-listeners/keyboard-listener/keyboard-listener.service';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class LineTool extends CreatorTool<LineToolProperties> {
  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new LineToolProperties();
    this.lockMethod = this.calculateNoLock;

    this.keyboardListener.addEvent(KeyboardListenerService.getIdentifier('Backspace'), () => {
      if (this.isActive) {
        this.shape.removeLastPoint();
      }
    });

    this.keyboardListener.addEvent(KeyboardListenerService.getIdentifier('Shift', false, true), () => {
      this.lockMethod = this.determineLockMethod();
      this.shape.updateCurrentCoord(this.lockMethod(this.mousePosition));
    });
    this.keyboardListener.addEvent(KeyboardListenerService.getIdentifier('Shift', false, false, 'keyup'), () => {
      this.lockMethod = this.calculateNoLock;
      this.shape.updateCurrentCoord(this.lockMethod(this.mousePosition));
    });
    this.keyboardListener.addEvent(KeyboardListenerService.getIdentifier('Escape'), () => {
      this.cancel();
    });
  }

  // tslint:disable-next-line:no-magic-numbers
  static readonly MAX_HORIZONTAL_LOCK_ANGLE: number = Math.PI / 6;
  // tslint:disable-next-line:no-magic-numbers
  static readonly MAX_DIAGONAL_LOCK_ANGLE: number = Math.PI / 3;
  static readonly MAX_VERTICAL_LOCK_ANGLE: number = Math.PI / 2;
  shape: CompositeLine;

  private lockMethod: (c: Coordinate) => Coordinate;

  handleDblClick(e: MouseEvent): boolean | void {
    if (this.isActive) {
      this.shape.endLine(this.mousePosition);
      this.applyShape();
    }
    return super.handleDblClick(e);
  }

  handleMouseDown(e: MouseEvent): boolean | void {
    this.isActive ? this.shape.confirmPoint() : this.startShape();
    return super.handleMouseDown(e);
  }

  handleMouseMove(e: MouseEvent): boolean | void {
    if (this.isActive) {
      this.shape.updateCurrentCoord(this.lockMethod(this.mousePosition));
    }
    return super.handleMouseMove(e);
  }

  protected updateProperties(): void {
    if (this.shape) {
      this.shape.shapeProperties.strokeColor = this.editorService.colorsService.primaryColor;
      this.shape.shapeProperties.fillColor = this.editorService.colorsService.secondaryColor;
      this.shape.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;

      const hasPoints = this.toolProperties.junctionType === LineJunctionType.POINTS;
      this.shape.shapeProperties.thickness = hasPoints ? this.toolProperties.junctionDiameter : 0;

      this.shape.updateProperties();
    }
  }

  createShape(): CompositeLine {
    return new CompositeLine(this.mousePosition);
  }

  determineLockMethod(): (c: Coordinate) => Coordinate {
    if (this.isActive) {
      const angle = Math.abs(Coordinate.angle(this.shape.currentLine.startCoord, this.shape.currentLine.endCoord));
      if (angle <= LineTool.MAX_HORIZONTAL_LOCK_ANGLE) {
        return this.calculateHorizontalLock;
      } else if (angle <= LineTool.MAX_DIAGONAL_LOCK_ANGLE) {
        const deltaX = this.shape.currentLine.endCoord.x - this.shape.currentLine.startCoord.x;
        const deltaY = this.shape.currentLine.endCoord.y - this.shape.currentLine.startCoord.y;

        const positiveDiagonalLock = (deltaX > 0 && deltaY > 0) || (deltaX < 0 && deltaY < 0);
        return positiveDiagonalLock ? this.calculatePositiveDiagonalLock : this.calculateNegativeDiagonalLock;
      } else if (angle <= LineTool.MAX_VERTICAL_LOCK_ANGLE) {
        return this.calculateVerticalLock;
      }
    }
    return this.calculateNoLock;
  }

  private calculateHorizontalLock(c: Coordinate): Coordinate {
    return new Coordinate(c.x, this.shape.currentLine.startCoord.y);
  }

  private calculateVerticalLock(c: Coordinate): Coordinate {
    return new Coordinate(this.shape.currentLine.startCoord.x, c.y);
  }

  private calculatePositiveDiagonalLock(c: Coordinate): Coordinate {
    const deltaX = c.x - this.shape.currentLine.startCoord.x;
    return new Coordinate(c.x, this.shape.currentLine.startCoord.y + deltaX);
  }

  private calculateNegativeDiagonalLock(c: Coordinate): Coordinate {
    const deltaX = c.x - this.shape.currentLine.startCoord.x;
    return new Coordinate(c.x, this.shape.currentLine.startCoord.y - deltaX);
  }

  private readonly calculateNoLock = (c: Coordinate): Coordinate => c;
}
