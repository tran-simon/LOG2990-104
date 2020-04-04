import { Injectable } from '@angular/core';
import { CommandReceiver } from '@models/commands/command-receiver';
import { ImageExportService } from '@services/image-export.service';
import { GridProperties } from '@tool-properties/grid-properties/grid-properties';
import { PolygonTool } from '@tools/creator-tools/shape-tools/polygon-tool';
import { SprayTool } from '@tools/creator-tools/spray-tool/spray-tool';
import { EraserTool } from '@tools/editing-tools/eraser-tool/eraser-tool';
import { SelectionTool } from '@tools/editing-tools/selection-tool';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { BaseShape } from 'src/app/models/shapes/base-shape';
import { LineTool } from 'src/app/models/tools/creator-tools/line-tool/line-tool';
import { EllipseTool } from 'src/app/models/tools/creator-tools/shape-tools/ellipse-tool';
import { RectangleTool } from 'src/app/models/tools/creator-tools/shape-tools/rectangle-tool';
import { BrushTool } from 'src/app/models/tools/creator-tools/stroke-tools/brush-tool/brush-tool';
import { PenTool } from 'src/app/models/tools/creator-tools/stroke-tools/pen-tool/pen-tool';
import { ColorApplicatorTool } from 'src/app/models/tools/editing-tools/color-applicator-tool';
import { PipetteTool } from 'src/app/models/tools/other-tools/pipette-tool';
import { Tool } from 'src/app/models/tools/tool';
import { ToolType } from 'src/app/models/tools/tool-type.enum';
import { ColorsService } from 'src/app/services/colors.service';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  readonly tools: Map<ToolType, Tool>;
  readonly selectedShapes: BaseShape[];
  readonly shapes: BaseShape[];
  private shapesBuffer: BaseShape[];
  private previewShapes: BaseShape[];
  private readonly _commandReceiver: CommandReceiver;

  readonly gridProperties: GridProperties;
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
    this.selectedShapes = new Array<BaseShape>();
    this.gridProperties = new GridProperties();
  }

  private initTools(): void {
    this.tools.set(ToolType.Pen, new PenTool(this));
    this.tools.set(ToolType.Brush, new BrushTool(this));
    this.tools.set(ToolType.Rectangle, new RectangleTool(this));
    this.tools.set(ToolType.Line, new LineTool(this));
    this.tools.set(ToolType.Select, new SelectionTool(this));
    this.tools.set(ToolType.Ellipse, new EllipseTool(this));
    this.tools.set(ToolType.Pipette, new PipetteTool(this));
    this.tools.set(ToolType.Polygon, new PolygonTool(this));
    this.tools.set(ToolType.Spray, new SprayTool(this));
    this.tools.set(ToolType.ColorApplicator, new ColorApplicatorTool(this));
    this.tools.set(ToolType.Eraser, new EraserTool(this));
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

  clearSelection(): void {
    this.selectedShapes.length = 0;
  }

  addPreviewShape(shape: BaseShape): void {
    this.previewShapes.push(shape);
    if (this.view) {
      this.view.addShape(shape);
    }
  }

  addShapesToBuffer(shapes: BaseShape[]): void {
    shapes.forEach(this.addShapeToBuffer, this);
  }

  addShapeToBuffer(shape: BaseShape): void {
    if (!this.view) {
      this.shapesBuffer.push(shape);
    } else if (!this.view.svg.contains(shape.svgNode)) {
      this.shapesBuffer.push(shape);
      this.view.addShape(shape);
    }
  }

  removeShapes(shapes: BaseShape[]): void {
    shapes.forEach(this.removeShape, this);
  }

  removeShapeFromView(shape: BaseShape): void {
    this.view.removeShape(shape);
  }

  removeShape(shape: BaseShape): void {
    const index = this.shapes.findIndex((s) => s === shape);
    if (index !== -1) {
      this.shapes.splice(index, 1);
      this.removeShapeFromView(shape);
    }
  }

  async viewToCanvas(): Promise<CanvasRenderingContext2D> {
    return ImageExportService.viewToCanvas(this.view);
  }
}
