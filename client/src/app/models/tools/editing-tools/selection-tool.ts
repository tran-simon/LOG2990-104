import { SimpleSelectionTool } from 'src/app/models/tools/editing-tools/simple-selection-tool';
import { EditorService } from 'src/app/services/editor.service';
import { MouseListenerService } from 'src/app/services/event-listeners/mouse-listener/mouse-listener.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { BaseShape } from '../../shapes/base-shape';
import { Rectangle } from '../../shapes/rectangle';

export class SelectionTool extends SimpleSelectionTool {
  // tslint:disable-next-line:no-magic-numbers
  static readonly BOUNDING_BOX_COLOR: Color = Color.rgb255(80, 80, 255, 0.25);

  private boundingBox: Rectangle;
  private selectArea: Rectangle;
  private initialMouseCoord: Coordinate;
  private reverseSelectionMode: boolean;
  private reverseSelectionArray: BaseShape[];

  constructor(public editorService: EditorService) {
    super(editorService);
    this.reverseSelectionMode = false;
    this.reverseSelectionArray = new Array<BaseShape>();
  }

  initMouseHandler(): void {
    this.handleMouseMove = () => {
      if (this.isActive && !this.reverseSelectionMode) {
        this.updateSelection();
      } else if (this.isActive && this.reverseSelectionMode) {
        this.resetSelection();
        this.resizeSelectArea();
        this.editorService.selectedShapes.push(...this.reverseSelectionArray);

        this.editorService.shapes.forEach((shape) => {
          if (this.detectBoundingBoxCollision(this.selectArea, shape)) {
            this.reverseSelection(shape, this.reverseSelectionArray);
          }
        });

        this.updateBoundingBox();
      }
    };

    this.handleMouseUp = () => {
      if (this.isActive) {
        this.isActive = false;
        this.applySelectArea();
      }
    };

    this.handleMouseDown = (e: MouseEvent) => {
      if (e.button === MouseListenerService.BUTTON_LEFT && !this.isActive) {
        this.isActive = true;
        this.reverseSelectionMode = false;
        this.initialMouseCoord = Coordinate.copy(this.mousePosition);
        this.initSelectArea();
        this.initBoundingBox();
        this.resetSelection();
      } else if (e.button === MouseListenerService.BUTTON_RIGHT && !this.isActive) {
        this.isActive = true;
        this.reverseSelectionMode = true;
        this.initialMouseCoord = Coordinate.copy(this.mousePosition);
        this.initSelectArea();
        this.reverseSelectionArray.length = 0;
        this.reverseSelectionArray.push(...this.editorService.selectedShapes);
      }
    };
  }

  selectShape(shape: BaseShape, rightClick: boolean = false): void {
    if (rightClick) {
      this.reverseSelection(shape);
    } else {
      this.resetSelection();
      this.addSelectedShape(shape);
      this.boundingBox.start = shape.origin;
      this.boundingBox.end = shape.end;
    }
  }

  selectAll(): void {
    this.resetSelection();
    this.editorService.selectedShapes.push(...this.editorService.shapes);
    this.updateBoundingBox();
  }

  initSelectArea(): void {
    this.selectArea = new Rectangle(this.initialMouseCoord);
    this.selectArea.primaryColor = Color.TRANSPARENT;
    this.selectArea.updateProperties();
    this.editorService.addPreviewShape(this.selectArea);
  }

  initBoundingBox(): void {
    this.boundingBox = new Rectangle(this.initialMouseCoord);
    this.boundingBox.svgNode.style.pointerEvents = 'none';
    this.boundingBox.primaryColor = SelectionTool.BOUNDING_BOX_COLOR;
    this.boundingBox.secondaryColor = SelectionTool.BOUNDING_BOX_COLOR;
    this.boundingBox.updateProperties();
    this.editorService.addPreviewShape(this.boundingBox);
  }

  resetSelection(): void {
    this.editorService.clearShapesBuffer();
    this.editorService.clearSelection();
    this.initSelectArea();
    this.initBoundingBox();
  }

  applySelectArea(): void {
    this.editorService.clearShapesBuffer();
    this.editorService.addPreviewShape(this.boundingBox);
  }

  reverseSelection(shape: BaseShape, array: BaseShape[] = this.editorService.selectedShapes): void {
    const index = array.indexOf(shape);
    if (index === -1) {
      this.addSelectedShape(shape);
    } else {
      this.removeSelectedShape(shape);
    }

    this.updateBoundingBox();
  }

  addSelectedShape(shape: BaseShape): void {
    const index = this.editorService.selectedShapes.indexOf(shape);
    if (index === -1) {
      this.editorService.selectedShapes.push(shape);
    }
  }

  removeSelectedShape(shape: BaseShape): void {
    const index = this.editorService.selectedShapes.indexOf(shape);
    if (index !== -1) {
      this.editorService.selectedShapes.splice(index, 1);
    }
  }

  updateSelection(): void {
    this.resetSelection();
    this.resizeSelectArea();

    this.editorService.shapes.forEach((shape) => {
      if (this.detectBoundingBoxCollision(this.selectArea, shape)) {
        this.addSelectedShape(shape);
      }
    });

    this.updateBoundingBox();
  }

  updateBoundingBox(): void {
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

  detectBoundingBoxCollision(area: Rectangle, shape: BaseShape): boolean {
    return !(
      // todo - proper method to determine if inside area
      // (area.origin.x > shape.origin.x && area.origin.y > shape.origin.y && area.end.x < shape.end.x && area.end.y < shape.end.y) ||
      (area.end.x < shape.origin.x || area.end.y < shape.origin.y || area.origin.x > shape.end.x || area.origin.y > shape.end.y)
    );
  }

  resizeSelectArea(): void {
    const dimensions = Coordinate.abs(Coordinate.substract(this.mousePosition, this.initialMouseCoord));
    this.selectArea.origin = Coordinate.minXYCoord(this.mousePosition, this.initialMouseCoord);
    this.selectArea.width = dimensions.x;
    this.selectArea.height = dimensions.y;
  }
}
