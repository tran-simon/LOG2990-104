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

  private static assignColorToShapeFromIndex(shape: BaseShape, index: number):void {
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
      this.editorService.shapes.forEach(shape => {
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


      this.editorService.shapes.forEach((shape, index)=>{
        if (this.selectedIndexes.indexOf(index) !== -1) {
            shape.svgNode.style.stroke = Color.RED.rgbString;
          shape.svgNode.style.strokeOpacity = '1';
        }
        else{
          // shape.updateProperties();
        }
      })

    };
  }

  initEraserView(): void {
    this.eraserView = new Rectangle(new Coordinate(), this.size);
    this.eraserView.primaryColor = Color.RED;
    this.eraserView.contourType = ContourType.FILLED;
    this.eraserView.updateProperties();

    this.editorService.addPreviewShape(this.eraserView);
  }
}
