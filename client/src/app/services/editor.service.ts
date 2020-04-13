import { Injectable } from '@angular/core';
import { CommandReceiver } from '@models/commands/command-receiver';
import { Drawing } from '@models/drawing';
import { BoundingBox } from '@models/shapes/bounding-box';
import { BrushPath } from '@models/shapes/brush-path';
import { CompositeLine } from '@models/shapes/composite-line';
import { CompositeParticle } from '@models/shapes/composite-particle';
import { Ellipse } from '@models/shapes/ellipse';
import { Line } from '@models/shapes/line';
import { Path } from '@models/shapes/path';
import { Polygon } from '@models/shapes/polygon';
import { Rectangle } from '@models/shapes/rectangle';
import { GridProperties } from '@tool-properties/grid-properties/grid-properties';
import { PolygonTool } from '@tools/creator-tools/shape-tools/polygon-tool';
import { SprayTool } from '@tools/creator-tools/spray-tool/spray-tool';
import { ColorFillTool } from '@tools/editing-tools/color-fill-tool/color-fill-tool';
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
import { APIService } from './api.service';
import { LocalSaveService } from './localsave.service';

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

  constructor(public colorsService: ColorsService, private localSaveService: LocalSaveService) {
    this._commandReceiver = new CommandReceiver();
    this.commandReceiver.on('action', () => {
      this.saveLocally();
    });

    this.tools = new Map<ToolType, Tool>();
    this.initTools();

    this.shapesBuffer = new Array<BaseShape>();
    this.shapes = new Array<BaseShape>();
    this.previewShapes = new Array<BaseShape>();
    this.selectedShapes = new Array<BaseShape>();
    this.gridProperties = new GridProperties();
  }

  static createShape(type: string): BaseShape {
    // todo - make standalone class to reduce dependencies?
    switch (type) {
      case 'BoundingBox':
        return new BoundingBox();
      case 'BrushPath':
        return new BrushPath();
      case 'CompositeLine':
        return new CompositeLine();
      case 'CompositeParticle':
        return new CompositeParticle();
      case 'Ellipse':
        return new Ellipse();
      case 'Line':
        return new Line();
      case 'Path':
        return new Path();
      case 'Polygon':
        return new Polygon();
      case 'Rectangle':
        return new Rectangle();
      default:
        throw new Error('Shape type not found');
    }
  }

  resetDrawing(): void {
    this.shapesBuffer.length = 0;
    this.shapes.length = 0;
    this.previewShapes.length = 0;
    this.selectedShapes.length = 0;

    setTimeout(() => {
      this.commandReceiver.clear();
    });
  }

  exportDrawing(): string {
    return JSON.stringify(this.shapes, (key, value) => {
      return key === 'svgNode' ? undefined : value;
    });
  }

  importDrawingById(drawingId: string, apiService: APIService): void {
    apiService.getDrawingById(drawingId).then((drawing) => {
      Object.values(JSON.parse(drawing.data)).forEach((shapeData) => {
        const type = (shapeData as BaseShape).type;
        const shape = EditorService.createShape(type);
        shape.readElement(JSON.stringify(shapeData)); // todo - fix
        this.addShapeToBuffer(shape);
      });
      this.applyShapesBuffer();
    });
  }

  importLocalDrawing(): void {
    Object.values(JSON.parse(this.localSaveService.drawing.data)).forEach((shapeData) => {
      const type = (shapeData as BaseShape).type;
      const shape = EditorService.createShape(type);
      shape.readElement(JSON.stringify(shapeData)); // todo - fix
      this.addShapeToBuffer(shape);
    });
    this.applyShapesBuffer();
  }

  saveLocally(): void {
    this.localSaveService.takeSnapshot(
      new Drawing('localsave', [], this.exportDrawing(), this.view.color.hex, this.view.width, this.view.height, ''),
    );
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
    this.tools.set(ToolType.ColorFill, new ColorFillTool(this));
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

  findShapeById(id: string): BaseShape | undefined {
    const matchingShapes = this.shapes.filter((shape) => shape.svgNode.id === id);
    if (matchingShapes.length > 1) {
      throw new Error('Shape Id collision error');
    }
    return matchingShapes.length ? matchingShapes[0] : undefined;
  }
}
