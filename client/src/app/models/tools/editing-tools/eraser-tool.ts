import { EditorService } from '../../../services/editor.service';
import { Color } from '../../../utils/color/color';
import { Coordinate } from '../../../utils/math/coordinate';
import { BaseShape } from '../../shapes/base-shape';
import { Rectangle } from '../../shapes/rectangle';
import { Tool } from '../tool';

export class EraserTool extends Tool {

  constructor(public editorService: EditorService) {
    super(editorService);
  }

  static readonly DEFAULT_SIZE: number = 25;
  static readonly HIGHLIGHT_SIZE: number = 3;

  private eraserView: Rectangle;
  private selectedShape: BaseShape | undefined;

  static highlightShape(shape: BaseShape): void {
    shape.svgNode.style.strokeWidth =
      shape.strokeWidth > EraserTool.HIGHLIGHT_SIZE ? shape.strokeWidth.toString() : EraserTool.HIGHLIGHT_SIZE.toString();
    shape.svgNode.style.stroke = Color.RED.hexString;
    shape.svgNode.style.strokeOpacity = '1';
  }

  initMouseHandler(): void {
    //todo:command
    this.handleMouseMove = () => {
      if (this.isActive && this.selectedShape) {
        this.editorService.removeShape(this.selectedShape);
      }
      this.updateSelection();
    };

    this.handleMouseUp = () => {
      if (this.isActive) {
        this.isActive = false;
      }
    };

    this.handleMouseDown = () => {
      this.isActive = true;
      if (this.selectedShape ) {
        this.editorService.removeShape(this.selectedShape);
      }
      this.updateSelection();
    };
    this.handleMouseLeave = this.handleMouseUp;
  }

  private resetSelection(): void {
    this.editorService.clearShapesBuffer();
    this.selectedShape = undefined;
    this.initEraserView();
  }

  initEraserView(): void {
    this.eraserView = new Rectangle();
    this.eraserView.primaryColor = Color.TRANSPARENT;
    this.eraserView.updateProperties();
    this.editorService.addPreviewShape(this.eraserView);
  }

  detectBoundingBoxCollision(area: Rectangle, shape: Rectangle): boolean {
    return (
      area.origin.x + area.width > shape.origin.x &&
      area.end.x - area.width < shape.end.x &&
      area.origin.y + area.height > shape.origin.y &&
      area.end.y - area.height < shape.end.y
    );
  }

  getBboxIntersection(area: Rectangle, shape: BaseShape): Rectangle[] {
    return shape.bboxes.filter((box: Rectangle) => this.detectBoundingBoxCollision(area, box));
  }

  getShapeIsIntersecting(area: Rectangle, shape: BaseShape): boolean {
    return !!this.getBboxIntersection(area, shape).length;
  }

  resizeSelectArea(size: number = EraserTool.DEFAULT_SIZE): void {
    this.eraserView.origin = new Coordinate(this.mousePosition.x - size / 2, this.mousePosition.y - size / 2);
    this.eraserView.width = size;
    this.eraserView.height = size;
  }

  updateSelection(): void {
    this.resetSelection();
    this.resizeSelectArea();

    this.editorService.shapes.forEach((shape: BaseShape) => {
      shape.updateProperties();
      if (this.getShapeIsIntersecting(this.eraserView, shape)) {
        this.selectedShape = shape;
      }
    });

    if (this.selectedShape) {
        EraserTool.highlightShape(this.selectedShape);
    }
  }
}
