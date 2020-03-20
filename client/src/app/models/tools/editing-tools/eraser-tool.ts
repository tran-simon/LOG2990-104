import { EditorService } from '../../../services/editor.service';
import { Color } from '../../../utils/color/color';
import { Coordinate } from '../../../utils/math/coordinate';
import { BaseShape } from '../../shapes/base-shape';
import { Rectangle } from '../../shapes/rectangle';
import { Tool } from '../tool';

export class EraserTool extends Tool {
  // tslint:disable-next-line:no-magic-numbers
  static readonly DEFAULT_SIZE: number = 25;
  static readonly HIGHLIGHT_SIZE: number = 3;

  private eraserView: Rectangle;

  constructor(public editorService: EditorService) {
    super(editorService);
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

  detectBoundingBoxCollision(area: Rectangle, shape: BaseShape): boolean {
    return (
      area.origin.x + area.width > shape.origin.x &&
      area.end.x - area.width < shape.end.x &&
      area.origin.y + area.height > shape.origin.y &&
      area.end.y - area.height < shape.end.y
    );
  }

  detectBoundingCollision(area: Rectangle, shape: BaseShape): boolean {
    if (shape.bboxes.length > 0) {
      let result = false;
      shape.bboxes.forEach((box: BaseShape) => {
        if (this.detectBoundingBoxCollision(area, box) && !result) {
          result = true;
        }
      });
      return result;
    } else {
      return this.detectBoundingBoxCollision(area, shape);
    }
  }

  resizeSelectArea(size: Coordinate = new Coordinate(EraserTool.DEFAULT_SIZE, EraserTool.DEFAULT_SIZE)): void {
    this.eraserView.origin = new Coordinate(this.mousePosition.x - size.x / 2, this.mousePosition.y - size.y / 2);
    this.eraserView.width = size.x;
    this.eraserView.height = size.y;
  }

  private highlightShape(shape: BaseShape): void {
    shape.svgNode.style.strokeWidth =
      shape.strokeWidth > EraserTool.HIGHLIGHT_SIZE ? shape.strokeWidth.toString() : EraserTool.HIGHLIGHT_SIZE.toString();
    shape.svgNode.style.stroke = Color.RED.hexString;
    shape.svgNode.style.strokeOpacity = '1';
  }

  updateSelection(): void {
    this.resetSelection();
    this.resizeSelectArea();

    const erasableShapes = Array<BaseShape>();
    this.editorService.shapes.forEach((shape: BaseShape) => {
      if (this.detectBoundingCollision(this.eraserView, shape)) {
        erasableShapes.push(shape);
      } else {
        shape.updateProperties();
      }
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
        this.highlightShape(topShape);
      }
    }
  }
}

/*import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Rectangle } from 'src/app/models/shapes/rectangle';
import { ContourType } from 'src/app/models/tool-properties/contour-type.enum';
import { PipetteTool } from 'src/app/models/tools/other-tools/pipette-tool';
import { Tool } from 'src/app/models/tools/tool';
import { EditorService } from 'src/app/services/editor.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class EraserTool extends Tool {
  static readonly DEFAULT_SIZE: number = 25;
  size: number;
  private eraserView: Rectangle;
  private ctx: CanvasRenderingContext2D;
  private selectedIndexes: number[];

  constructor(editorService: EditorService) {
    super(editorService);
    this.size = EraserTool.DEFAULT_SIZE;
  }

  private static assignColorToShapeFromIndex(shape: BaseShape, index: number): void {
    const hex: string = ((index + 1) * 10).toString(16).padStart(6, '0');
    const color = Color.hex(hex);

    const style = shape.svgNode.style;
    if (style.fill !== BaseShape.NO_STYLE) {
      style.fill = color.rgbString;
    }
    if (style.stroke !== BaseShape.NO_STYLE) {
      style.stroke = color.rgbString;
    }
  }

  init(): void {
    const background = this.editorService.view.svg.querySelector('#background');
    if (background) {
      background.setAttribute('visibility', 'hidden');
    }

    this.editorService.shapes.forEach(EraserTool.assignColorToShapeFromIndex);

    this.editorService.viewToCanvas().then((ctx) => {
      this.ctx = ctx;
      this.editorService.shapes.forEach((shape) => {
        // shape.updateProperties();
      });

      if (background) {
        // background.setAttribute('visibility', 'visible');
      }
      this.initEraserView();
    });

  }

  selectShapes(x: number, y: number): void {
    this.selectedIndexes = [];
    if (this.ctx) {
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          const color = PipetteTool.colorAtPointInCanvas(this.ctx, new Coordinate(x + i, y + j));

          const index = parseInt(color.hex, 16) / 10 - 1;
          console.log(color.hex + ' : ' + index);

          if (index >= 0 && this.editorService.shapes[index]) {
            this.selectedIndexes.push(index);

          } else {
          }

        }
      }
    } else {
      console.error('NO CTX??');
    }

    // console.log(colorsArray);
  }

  initMouseHandler(): void {
    this.handleMouseMove = () => {
      if (!this.eraserView) {
        this.initEraserView();
      }

      const x = this.mousePosition.x - this.size / 2;
      const y = this.mousePosition.y - this.size / 2;
      this.eraserView.origin = new Coordinate(x, y);
      this.selectShapes(x, y);

      this.editorService.shapes.forEach((shape, index)=> {
        if (this.selectedIndexes.indexOf(index) !== -1) {
            shape.svgNode.style.stroke = Color.RED.rgbString;
            shape.svgNode.style.strokeOpacity = '1';
        } else {
          // shape.updateProperties();
        }
      });

    };
  }

  initEraserView(): void {
    this.eraserView = new Rectangle(new Coordinate(), this.size);
    this.eraserView.primaryColor = Color.RED;
    this.eraserView.contourType = ContourType.FILLED;
    this.eraserView.updateProperties();

    this.editorService.addPreviewShape(this.eraserView);
  }
}*/
