import { Rectangle } from 'src/app/models/shapes/rectangle';
import { ContourType } from 'src/app/models/tool-properties/contour-type.enum';
import { EraserUtils } from 'src/app/models/tools/editing-tools/eraser-tool/eraser-utils';
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

  init(): void {
    const svgCopy: SVGElement = this.editorService.view.svg.cloneNode(true) as SVGElement;

    const background = svgCopy.querySelector('#background');
    if (background) {
      background.setAttribute('fill', Color.RED.rgbString);
    }

    svgCopy.childNodes.forEach((node: SVGElement) => {
      if (node.id.startsWith('shape-')) {
        const id = node.id.split('-')[1];
        EraserUtils.sanitizeAndAssignColorToSvgNode(node, (+id) + 1);
      }
    });

    this.editorService.view.svg.parentElement.appendChild(svgCopy);// todo

    EditorService.viewToCanvas(this.editorService.view, svgCopy).then((ctx) => {
      ctx.imageSmoothingEnabled = false;
      this.ctx = ctx;
      this.initEraserView();
    });
  }

  selectShapes(x: number, y: number): void {
    this.selectedIndexes = [];
    if (this.ctx) {
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          const color = PipetteTool.colorAtPointInCanvas(this.ctx, new Coordinate(x + i, y + j));

          /* ignore the color if there's red (to avoid issues with antialiasing) */
          if (color.r > 0) {
            continue;
          }

          const index = EraserUtils.indexFromColor(color);
          const delta = Math.abs(index - Math.round(index));
          if (delta > EraserUtils.TOLERANCE) {
            continue;
          }

          if (index >= 0 && this.selectedIndexes.indexOf(index) === -1) {
            this.selectedIndexes.push(Math.round(index));
          }
        }
      }
    } else {
      throw new Error('Canvas context could not be loaded');
    }
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

      this.selectedIndexes.forEach((index) => {
        const shape = this.editorService.shapes[index];
        if (shape) {
          EraserUtils.highlightShape(shape);
        }
      });
    };
  }

  initEraserView(): void {
    this.eraserView = new Rectangle(new Coordinate(), this.size);
    this.eraserView.primaryColor = Color.WHITE;
    this.eraserView.contourType = ContourType.FILLED;
    this.eraserView.updateProperties();

    this.editorService.addPreviewShape(this.eraserView);
  }
}
