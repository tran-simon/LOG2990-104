import { SimpleSelectionTool } from 'src/app/models/tools/editing-tools/simple-selection-tool';
import { EditorService } from 'src/app/services/editor.service';
import { MouseListenerService } from 'src/app/services/event-listeners/mouse-listener/mouse-listener.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { BaseShape } from '../../shapes/base-shape';
import { BoundingBox } from '../../shapes/bounding-box';
import { Rectangle } from '../../shapes/rectangle';

export class SelectionTool extends SimpleSelectionTool {
  private boundingBox: BoundingBox;
  private selectArea: Rectangle;
  private initialMouseCoord: Coordinate;
  private reverseSelectionMode: boolean;
  private previouslySelectedShapes: BaseShape[];

  static detectBoundingBoxCollision(area: Rectangle, shape: BaseShape): boolean {
    return !(area.end.x < shape.origin.x || area.end.y < shape.origin.y || area.origin.x > shape.end.x || area.origin.y > shape.end.y);
  }

  constructor(public editorService: EditorService) {
    super(editorService);
    this.reverseSelectionMode = false;
    this.previouslySelectedShapes = new Array<BaseShape>();
  }

  initMouseHandler(): void {
    this.handleMouseDown = (e: MouseEvent) => {
      if (!this.isActive) {
        this.isActive = true;
        if (e.button === MouseListenerService.BUTTON_LEFT) {
          this.beginSelection(this.mousePosition);
        } else if (e.button === MouseListenerService.BUTTON_RIGHT) {
          this.beginReverseSelection(this.mousePosition);
        }
      }
    };

    this.handleMouseMove = () => {
      if (this.isActive) {
        this.updateSelection(this.reverseSelectionMode);
      }
    };

    this.handleMouseUp = () => {
      if (this.isActive) {
        this.isActive = false;
        this.applyBoundingBox();
      }
    };
  }

  selectShape(shape: BaseShape, rightClick: boolean = false): void {
    if (rightClick) {
      this.reverseSelection(shape);
    } else {
      this.resetSelection();
      this.addSelectedShape(shape);
      this.updateBoundingBox();
    }
  }

  selectAll(): void {
    this.resetSelection();
    this.editorService.selectedShapes.push(...this.editorService.shapes);
    this.updateBoundingBox();
  }

  private beginSelection(c: Coordinate): void {
    this.reverseSelectionMode = false;
    this.initialMouseCoord = Coordinate.copy(c);
    this.resetSelection();
  }

  private beginReverseSelection(c: Coordinate): void {
    this.reverseSelectionMode = true;
    this.initialMouseCoord = Coordinate.copy(c);
    this.initSelectArea();
    this.previouslySelectedShapes.length = 0;
    this.previouslySelectedShapes.push(...this.editorService.selectedShapes);
  }

  private initSelectArea(): void {
    this.selectArea = new Rectangle(this.initialMouseCoord);
    this.selectArea.primaryColor = Color.TRANSPARENT;
    this.selectArea.svgNode.style.pointerEvents = 'none';
    this.selectArea.updateProperties();
    this.editorService.addPreviewShape(this.selectArea);
  }

  private initBoundingBox(): void {
    this.boundingBox = new BoundingBox(this.initialMouseCoord);
    this.editorService.addPreviewShape(this.boundingBox);
  }

  private resetSelection(): void {
    this.editorService.clearShapesBuffer();
    this.editorService.clearSelection();
    this.initSelectArea();
    this.initBoundingBox();
  }

  private applyBoundingBox(): void {
    this.editorService.clearShapesBuffer();
    this.editorService.addPreviewShape(this.boundingBox);
  }

  private reverseSelection(shape: BaseShape, array: BaseShape[] = this.editorService.selectedShapes): void {
    array.indexOf(shape) === -1 ? this.addSelectedShape(shape) : this.removeSelectedShape(shape);
    this.updateBoundingBox();
  }

  private addSelectedShape(shape: BaseShape): void {
    const index = this.editorService.selectedShapes.indexOf(shape);
    if (index === -1) {
      this.editorService.selectedShapes.push(shape);
    }
  }

  private removeSelectedShape(shape: BaseShape): void {
    const index = this.editorService.selectedShapes.indexOf(shape);
    if (index !== -1) {
      this.editorService.selectedShapes.splice(index, 1);
    }
  }

  private updateSelection(reverse: boolean = this.reverseSelectionMode): void {
    this.resetSelection();
    this.resizeSelectArea();

    if (reverse) {
      this.editorService.selectedShapes.push(...this.previouslySelectedShapes);
    }

    this.editorService.shapes.forEach((shape) => {
      if (SelectionTool.detectBoundingBoxCollision(this.selectArea, shape)) {
        reverse ? this.reverseSelection(shape, this.previouslySelectedShapes) : this.addSelectedShape(shape);
      }
    });

    this.updateBoundingBox();
  }

  private updateBoundingBox(): void {
    if (this.editorService.selectedShapes.length > 0) {
      this.boundingBox.origin = this.editorService.selectedShapes[0].origin;
      this.boundingBox.end = this.editorService.selectedShapes[0].end;
      this.editorService.selectedShapes.forEach((shape) => {
        this.boundingBox.start = Coordinate.minXYCoord(this.boundingBox.origin, shape.origin);
        this.boundingBox.end = Coordinate.maxXYCoord(this.boundingBox.end, shape.end);
      });
    } else {
      this.boundingBox.origin = new Coordinate();
      this.boundingBox.end = new Coordinate();
    }
  }

  private resizeSelectArea(origin: Coordinate = this.initialMouseCoord, end: Coordinate = this.mousePosition): void {
    this.selectArea.origin = origin;
    this.selectArea.end = end;
  }
}
