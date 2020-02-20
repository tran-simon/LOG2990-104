import { ElementRef, Injectable } from '@angular/core';
import { BaseShape } from 'src/app/models/shapes/base-shape';
import { LineTool } from 'src/app/models/tools/creator-tools/line-tool/line-tool';
import { RectangleTool } from 'src/app/models/tools/creator-tools/shape-tools/rectangle-tool';
import { BrushTool } from 'src/app/models/tools/creator-tools/stroke-tools/brush-tool';
import { PenTool } from 'src/app/models/tools/creator-tools/stroke-tools/pen-tool';
import { Tool, ToolType } from 'src/app/models/tools/tool';
import { ColorsService } from 'src/app/services/colors.service';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  constructor(public colorsService: ColorsService) {
    this.tools = {
      [ToolType.Pen]: new PenTool(this),
      [ToolType.Brush]: new BrushTool(this),
      [ToolType.Rectangle]: new RectangleTool(this),
      [ToolType.Line]: new LineTool(this),
    } as Record<ToolType, Tool>;
  }

  tools: Record<ToolType, Tool>;

  view: ElementRef | undefined;

  private shapesBuffer = new Array<BaseShape>();
  private shapes = new Array<BaseShape>();
  private previewShapes = new Array<BaseShape>();

  static removeShapeFromView(view: ElementRef | undefined, shape: BaseShape): void {
    if (view) {
      view.nativeElement.removeChild(shape.svgNode);
    }
  }

  static addShapeToView(view: ElementRef | undefined, shape: BaseShape): void {
    if (view) {
      view.nativeElement.appendChild(shape.svgNode);
    }
  }

  applyShapesBuffer(): void {
    this.shapes.concat(this.shapesBuffer);
    this.shapesBuffer = [];
    this.clearShapesBuffer();
  }

  clearShapesBuffer() {
    const removeShapes = (shape: BaseShape): void => {
      EditorService.removeShapeFromView(this.view, shape);
    };
    this.shapesBuffer.forEach(removeShapes);
    this.previewShapes.forEach(removeShapes);
    this.shapesBuffer = [];
    this.previewShapes = [];
  }

  addPreviewShape(shape: BaseShape): void {
    this.previewShapes.push(shape);
    EditorService.addShapeToView(this.view, shape);
  }

  addShapeToBuffer(shape: BaseShape): void {
    this.shapes.concat(this.shapesBuffer);
    this.shapesBuffer = [shape];

    EditorService.addShapeToView(this.view, shape);
  }

  removeShapeFromBuffer(shape: BaseShape): void {
    const index = this.shapes.indexOf(shape);
    if (index !== -1) {
      this.shapes.splice(index, 1);

      EditorService.removeShapeFromView(this.view, shape);
    }
  }
}
