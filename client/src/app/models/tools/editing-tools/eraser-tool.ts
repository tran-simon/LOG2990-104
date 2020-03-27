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

  static highlightShape(shape: BaseShape): void {
    shape.svgNode.style.strokeWidth =
      shape.strokeWidth > EraserTool.HIGHLIGHT_SIZE ? shape.strokeWidth.toString() : EraserTool.HIGHLIGHT_SIZE.toString();
    shape.svgNode.style.stroke = Color.RED.hexString;
    shape.svgNode.style.strokeOpacity = '1';
  }

  initMouseHandler(): void {
    this.handleMouseMove = () => {
      this.updateSelection();
    };

    this.handleMouseUp = () => {
      if (this.isActive) {
        this.isActive = false;
      }
    };

    this.handleMouseDown = () => {
      if (!this.isActive) {
        this.isActive = true;
        this.updateSelection();
      }
    };
    this.handleMouseLeave = this.handleMouseUp;
  }

  private resetSelection(): void {
    this.editorService.clearShapesBuffer();
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

  detectBoundingCollision(area: Rectangle, shape: BaseShape): Rectangle[] {
    return shape.bboxes.filter((box: Rectangle) => this.detectBoundingBoxCollision(area, box));
  }

  resizeSelectArea(size: Coordinate = new Coordinate(EraserTool.DEFAULT_SIZE, EraserTool.DEFAULT_SIZE)): void {
    this.eraserView.origin = new Coordinate(this.mousePosition.x - size.x / 2, this.mousePosition.y - size.y / 2);
    this.eraserView.width = size.x;
    this.eraserView.height = size.y;
  }

  updateSelection(): void {
    this.resetSelection();
    this.resizeSelectArea();

    const erasableShapes = Array<BaseShape>();
    this.editorService.shapes.forEach((shape: BaseShape) => {
      !!this.detectBoundingCollision(this.eraserView, shape).length ?
        erasableShapes.push(shape) :
        shape.updateProperties();
    });
    if (erasableShapes.length > 0) {
      let topShape = erasableShapes[0];
      erasableShapes.forEach((shape: BaseShape) => {
        if (shape.id > topShape.id) {
          topShape.updateProperties();
          topShape = shape;
        }
      });
      if (this.isActive && !!topShape) {
        this.editorService.removeShape(topShape);
      } else {
        EraserTool.highlightShape(topShape);
      }
    }
  }
}
