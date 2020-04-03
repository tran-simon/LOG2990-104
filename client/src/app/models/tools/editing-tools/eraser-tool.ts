import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { BaseShape } from 'src/app/models/shapes/base-shape';
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

  private static assignColorToShapeFromIndex(node:SVGElement, index: number):void {
    const hex: string = ((index) * 10).toString(16).padStart(6, '0');
    const color = Color.hex(hex);

    const style = node.style;
    if (style.fill !== BaseShape.CSS_NONE) {
      style.fill = color.rgbString;
    }
    if (style.stroke !== BaseShape.CSS_NONE) {
      style.stroke = color.rgbString;
    }
  }

  static sanitizeChildNodes(node: SVGElement, id: number): void{
    const a = node.style.strokeWidth;
    if (!a || +a < 5) {
      node.style.strokeWidth = '5';
    }
    node.setAttribute('filter', '')
    EraserTool.assignColorToShapeFromIndex(node, (+id) + 1);
    node.childNodes.forEach((childNode:SVGElement) => {
      EraserTool.sanitizeChildNodes(childNode, id);
    });
  }

  init(): void {
    const svgCopy: SVGElement = this.editorService.view.svg.cloneNode(true) as SVGElement;

    const background = svgCopy.querySelector('#background');
    if (background) {
      background.setAttribute('fill', Color.RED.rgbString);
    }

    svgCopy.childNodes.forEach((node: SVGElement, index: number) => {
      console.log(node.id);
      if (node.id.startsWith('shape-')) {
        const a = node.style.strokeWidth;
        if (!a || +a < 5) {
          node.style.strokeWidth = '5';
        }
        node.setAttribute('filter', '');
        const xd = node.id.split('-')[1];
        node.childNodes.forEach((childNode:SVGElement) => {
          EraserTool.sanitizeChildNodes(childNode, (+xd) + 1);
        });
        EraserTool.assignColorToShapeFromIndex(node, (+xd) + 1);
      }
    });

    const drawingSurface = new DrawingSurfaceComponent();
    drawingSurface.width = this.editorService.view.width;
    drawingSurface.height = this.editorService.view.height;

    this.editorService.view.svg.parentElement.appendChild(svgCopy);

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

          if (color.r > 0) {
            // console.log("ASDFASDFASDF" + color.rgbString);
            continue;
          }
          const index1 = parseInt(color.hex, 16) / 10 -1;
          // const index1 = +((color.h / 10) - 1).toFixed(1);
          // const index1 = +((color.l * 100) - 1).toFixed(1);
          const a = Math.abs(index1 - Math.round(index1));
      if (a > 0.1) {

        return;
      }
      const index = Math.round(index1);


          // if (color.hex !== Color.BLACK.hex) {
          //   console.log(color.rgbString);
          // }
      if (color.hexString !== Color.RED.hexString) {
        // console.log(color.hexString);
      }
          if (index >= 0 && color.hexString !== Color.RED.hexString && this.selectedIndexes.indexOf(index) === -1) {
            // console.log(color.hexString + ' A ' + index + " P " + a + " P " + index1);
          }

          if (index >= 0 && color.hexString !== Color.RED.hexString && this.selectedIndexes.indexOf(index) === -1) {
            this.selectedIndexes.push(index);
            this.editorService.view.color = Color.rgb(0, 0, color.b);
            // console.log(color.hexString + " : " + index);

          } else {
          }

        }
      }
    }
    else{
      console.error("NO CTX??")
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

      // this.editorService.shapes.forEach(shaoe => shaoe.updateProperties());

      this.selectedIndexes.forEach(index => {
        if (this.editorService.shapes[index]) {

        this.editorService.shapes[index].svgNode.style.stroke = Color.RED.rgbString;
        this.editorService.shapes[index].svgNode.style.strokeOpacity = '1';
        }
      });
      if (this.selectedIndexes.length === 0) {

        this.editorService.view.color = Color.GREEN;
      }

    };
  }

  initEraserView(): void {
    this.eraserView = new Rectangle(new Coordinate(), this.size);
    this.eraserView.primaryColor = Color.RED;
    this.eraserView.contourType = ContourType.CONTOUR;
    this.eraserView.updateProperties();

    this.editorService.addPreviewShape(this.eraserView);
  }
}
