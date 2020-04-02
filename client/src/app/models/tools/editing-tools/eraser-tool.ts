import { EraserToolProperties } from '@tool-properties/editor-tool-properties/eraser-tool-properties';
import { RemoveShapesCommand } from 'src/app/models/commands/shape-commands/remove-shapes-command';
import { EditorService } from '../../../services/editor.service';
import { Color } from '../../../utils/color/color';
import { Coordinate } from '../../../utils/math/coordinate';
import { BaseShape } from '../../shapes/base-shape';
import { Rectangle } from '../../shapes/rectangle';
import { Tool } from '../tool';

export class EraserTool extends Tool {

  constructor(public editorService: EditorService) {
    super(editorService);
    this.removedShapes = [];
    this.toolProperties = new EraserToolProperties();
  }

  static readonly HIGHLIGHT_SIZE: number = 3;
  toolProperties: EraserToolProperties;

  private eraserView: Rectangle;
  private selectedShape: BaseShape | undefined;
  private removedShapes: BaseShape[];

  static highlightShape(shape: BaseShape): void {
    shape.svgNode.style.strokeWidth =
      shape.strokeWidth > EraserTool.HIGHLIGHT_SIZE ? shape.strokeWidth.toString() : EraserTool.HIGHLIGHT_SIZE.toString();
    shape.svgNode.style.stroke = Color.RED.hexString;
    shape.svgNode.style.strokeOpacity = '1';
  }

  private erase(shape: BaseShape | undefined): void {
    if (shape) {
      this.editorService.removeShapeFromView(shape);
      this.removedShapes.push(shape);
    }
  }

  initMouseHandler(): void {
    this.handleMouseMove = () => {
      if (this.isActive) {
        this.erase(this.selectedShape);
      }
      this.updateSelection();
    };

    this.handleMouseUp = () => {
      if (this.isActive && this.removedShapes.length) {
        const removeShapesCommand = new RemoveShapesCommand(this.removedShapes, this.editorService);
        this.editorService.commandReceiver.add(removeShapesCommand);
        this.removedShapes = [];
      }
      this.isActive = false;
    };

    this.handleMouseDown = () => {
      this.isActive = true;
      this.erase(this.selectedShape);
      this.updateSelection();
    };
    this.handleMouseLeave = this.handleMouseUp;
  }

  private resetCurrentSelection(): void {
    this.editorService.clearShapesBuffer();
    this.selectedShape = undefined;
    this.initEraserView();
  }

  private initEraserView(): void {
    this.eraserView = new Rectangle();
    this.eraserView.primaryColor = Color.WHITE;
    this.resizeSelectArea(this.toolProperties.eraserSize.value);
    this.eraserView.updateProperties();
    this.editorService.addPreviewShape(this.eraserView);
  }

  detectBoundingBoxCollision(area: Rectangle, shape: Rectangle): boolean {
    // todo: move somewhere else?
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

  private resizeSelectArea(size: number = EraserToolProperties.DEFAULT_SIZE): void {
    this.eraserView.origin = new Coordinate(this.mousePosition.x - size / 2, this.mousePosition.y - size / 2);
    this.eraserView.width = size;
    this.eraserView.height = size;
  }

  updateSelection(): void {
    this.resetCurrentSelection();

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
