import { Injectable } from '@angular/core';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { BaseShape } from 'src/app/models/shapes/base-shape';
import { LineTool } from 'src/app/models/tools/creator-tools/line-tool/line-tool';
import { RectangleTool } from 'src/app/models/tools/creator-tools/shape-tools/rectangle-tool';
import { BrushTool } from 'src/app/models/tools/creator-tools/stroke-tools/brush-tool/brush-tool';
import { PenTool } from 'src/app/models/tools/creator-tools/stroke-tools/pen-tool/pen-tool';
import { PipetteTool } from 'src/app/models/tools/other-tools/pipette-tool';
import { Tool } from 'src/app/models/tools/tool';
import { ToolType } from 'src/app/models/tools/tool-type.enum';
import { ColorsService } from 'src/app/services/colors.service';
import { CommandReceiver } from '../models/commands/command-receiver';
import { PolygonTool } from '../models/tools/creator-tools/shape-tools/polygon-tool';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  readonly tools: Map<ToolType, Tool>;
  readonly shapes: BaseShape[];
  private shapesBuffer: BaseShape[];
  private previewShapes: BaseShape[];
  private _commandReceiver: CommandReceiver;

  view: DrawingSurfaceComponent;

  get commandReceiver(): CommandReceiver {
    return this._commandReceiver;
  }

  constructor(public colorsService: ColorsService) {
    this._commandReceiver = new CommandReceiver();

    this.tools = new Map<ToolType, Tool>();
    this.initTools();

    this.shapesBuffer = new Array<BaseShape>();
    this.shapes = new Array<BaseShape>();
    this.previewShapes = new Array<BaseShape>();
  }

  private initTools(): void {
    this.tools.set(ToolType.Pen, new PenTool(this));
    this.tools.set(ToolType.Brush, new BrushTool(this));
    this.tools.set(ToolType.Rectangle, new RectangleTool(this));
    this.tools.set(ToolType.Line, new LineTool(this));
    this.tools.set(ToolType.Pipette, new PipetteTool(this));
    this.tools.set(ToolType.Polygon, new PolygonTool(this));
  }

  applyShapesBuffer(): void {
    this.shapes.push(...this.shapesBuffer);
    this.shapesBuffer = [];
    this.clearShapesBuffer();
  }

  clearShapesBuffer(): void {
    const removeShapes = (shape: BaseShape): void => {
      if (this.view) {
        this.view.removeShape(shape);
      }
    };
    this.shapesBuffer.forEach(removeShapes);
    this.previewShapes.forEach(removeShapes);
    this.shapesBuffer = [];
    this.previewShapes = [];
  }

  addPreviewShape(shape: BaseShape): void {
    this.previewShapes.push(shape);
    if (this.view) {
      this.view.addShape(shape);
    }
  }

  addShapeToBuffer(shape: BaseShape): void {
    this.shapesBuffer.push(shape);
    if (this.view) {
      this.view.addShape(shape);
    }
  }

  /**
   * Based on: https://stackoverflow.com/questions/3768565/drawing-an-svg-file-on-a-html5-canvas
   */
  createDataURL(surface: DrawingSurfaceComponent): string {
    const xmlSerializer = new XMLSerializer();
    const svgString = xmlSerializer.serializeToString(surface.svg);
    return 'data:image/svg+xml,' + encodeURIComponent(svgString);
  }

  exportSVGElement(name: string, surface: DrawingSurfaceComponent): void {
    const download = document.createElement('a');
    download.setAttribute('href', this.createDataURL(surface));
    download.setAttribute('download', name);
    download.click();
  }
  exportImageElement(name: string, extension: string, surface: DrawingSurfaceComponent): void {
    const image = new Image();
    const canvas = document.createElement('canvas');
    image.src = this.createDataURL(surface);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    image.onload = () => {
      canvas.width = surface.width;
      canvas.height = surface.height;
      ctx.drawImage(image, 0, 0);
      const download = document.createElement('a');
      download.href = canvas.toDataURL(`image/${extension}`);
      download.download = name;
      download.click();
    };
  }

  removeShape(shape: BaseShape): void {
    const index = this.shapes.findIndex((s) => s === shape);
    if (index !== -1) {
      this.shapes.splice(index, 1, shape);
      this.view.removeShape(shape);
    }
  }
}
