import { EditorService } from 'src/app/services/editor.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { BaseShape } from '../../shapes/base-shape';
import { Rectangle } from '../../shapes/rectangle';
import { Tool } from '../tool';

export class SelectionTool extends Tool {
  // tslint:disable-next-line:no-magic-numbers
  static readonly BOUNDING_BOX_COLOR: Color = Color.rgb255(80, 80, 255, 0.1);

  private boundingBox: Rectangle;
  private selectArea: Rectangle;
  private initialMouseCoord: Coordinate;

  constructor(public editorService: EditorService) {
    super(editorService);
    this.editorService.selectedShapes = new Array<BaseShape>();
  }

  initMouseHandler(): void {
    this.handleMouseMove = () => {
      if (this.isActive) {
        this.updateSelection();
      }
    };

    this.handleMouseUp = () => {
      if (this.isActive) {
        this.isActive = false;
        this.applySelectArea();
      }
    };

    this.handleMouseDown = () => {
      if (!this.isActive) {
        this.isActive = true;
        this.initialMouseCoord = Coordinate.copy(this.mousePosition);
        this.initSelectArea();
      }
    };
  }

  selectSingleItem(c: Coordinate): void {
    let selectedShape: BaseShape | undefined;
    this.resetSelection();

    this.editorService.shapes.forEach((shape) => {
      const inBoundsX = shape.end.x >= c.x && shape.origin.x <= c.x;
      const inBoundsY = shape.end.y >= c.y && shape.origin.y <= c.y;
      if (inBoundsX && inBoundsY) {
        // todo - proper method to determine if inside area
        selectedShape = shape;
      }
    });
    if (selectedShape) {
      this.editorService.selectedShapes.push(selectedShape);
      this.boundingBox.origin = selectedShape.origin;
      this.boundingBox.width = selectedShape.width;
      this.boundingBox.height = selectedShape.height;
    }
  }

  initSelectArea(): void {
    this.selectArea = new Rectangle(this.initialMouseCoord);
    this.selectArea.shapeProperties.fillColor = Color.TRANSPARENT;
    this.selectArea.updateProperties();
    this.editorService.addPreviewShape(this.selectArea);

    this.boundingBox = new Rectangle(this.initialMouseCoord);
    this.boundingBox.shapeProperties.fillColor = SelectionTool.BOUNDING_BOX_COLOR;
    this.boundingBox.shapeProperties.strokeColor = SelectionTool.BOUNDING_BOX_COLOR;
    this.boundingBox.updateProperties();
    this.editorService.addPreviewShape(this.boundingBox);
  }

  resetSelection(): void {
    this.editorService.clearShapesBuffer();
    this.editorService.selectedShapes = new Array<BaseShape>();
    this.initSelectArea();
  }

  applySelectArea(): void {
    this.editorService.clearShapesBuffer();
    this.editorService.addPreviewShape(this.boundingBox);
    if (this.selectArea.height === 0 && this.selectArea.width === 0) {
      this.selectSingleItem(this.mousePosition);
    }
  }

  updateSelection(): void {
    let boundingBoxMin: Coordinate;
    let boundingBoxMax: Coordinate;
    this.resetSelection();
    this.resizeSelectArea();

    this.editorService.shapes.forEach((shape) => {
      if (this.detectBoundingBoxCollision(this.selectArea, shape)) {
        this.editorService.selectedShapes.push(shape);
        boundingBoxMin = Coordinate.minXYCoord(boundingBoxMin, shape.origin);
        boundingBoxMax = Coordinate.maxXYCoord(boundingBoxMax, shape.end);
        this.boundingBox.origin = boundingBoxMin;
        this.boundingBox.width = boundingBoxMax.x - boundingBoxMin.x;
        this.boundingBox.height = boundingBoxMax.y - boundingBoxMin.y;
      }
    });
  }

  detectBoundingBoxCollision(area: Rectangle, shape: BaseShape): boolean {
    return !(
      // todo - proper method to determine if inside area
      (
        (area.origin.x > shape.origin.x && area.origin.y > shape.origin.y && area.end.x < shape.end.x && area.end.y < shape.end.y) ||
        area.end.x < shape.origin.x ||
        area.end.y < shape.origin.y ||
        area.origin.x > shape.end.x ||
        area.origin.y > shape.end.y
      )
    );
  }

  resizeSelectArea(): void {
    const dimensions = Coordinate.abs(Coordinate.substract(this.mousePosition, this.initialMouseCoord));
    this.selectArea.origin = Coordinate.minXYCoord(this.mousePosition, this.initialMouseCoord);
    this.selectArea.width = dimensions.x;
    this.selectArea.height = dimensions.y;
  }
}
