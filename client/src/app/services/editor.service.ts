import { Injectable } from '@angular/core';
import { CommandReceiver } from '@models/commands/command-receiver';
import { AddShapesCommand } from '@models/commands/shape-commands/add-shapes-command';
import { RemoveShapesCommand } from '@models/commands/shape-commands/remove-shapes-command';
import { ShapeStates } from '@models/shapes/shape-states.enum';
import { GridProperties } from '@tool-properties/grid-properties/grid-properties';
import { PolygonTool } from '@tools/creator-tools/shape-tools/polygon-tool';
import { SprayTool } from '@tools/creator-tools/spray-tool/spray-tool';
import { ColorFillTool } from '@tools/editing-tools/color-fill-tool/color-fill-tool';
import { EraserTool } from '@tools/editing-tools/eraser-tool/eraser-tool';
import { SelectionTool } from '@tools/editing-tools/selection-tool';
import { Coordinate } from '@utils/math/coordinate';
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

  readonly clipboard: BaseShape[];
  readonly pastedBuffer: BaseShape[];
  readonly duplicationBuffer: BaseShape[];
  readonly pastedDuplicateBuffer: BaseShape[];
  readonly deletedBuffer: BaseShape[];
  pasteOffset: number;

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

    this.clipboard = new Array<BaseShape>();
    this.duplicationBuffer = new Array<BaseShape>();
    this.pastedBuffer = new Array<BaseShape>();
    this.pastedDuplicateBuffer = new Array<BaseShape>();
    this.deletedBuffer = new Array<BaseShape>();
    this.pasteOffset = SelectionTool.PASTED_OFFSET;
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

  // todo : refactor
  private offsetCopies(buffer: BaseShape[], pastedBuffer: BaseShape[]): BaseShape[] {
    const copies = new Array<BaseShape>();
    buffer.forEach((shape: BaseShape) => {
      const copy = shape.copy;
      copy.state = ShapeStates.PASTED;
      copy.origin = Coordinate.add(copy.origin, new Coordinate(this.pasteOffset, this.pasteOffset));
      if (copy.origin.x > this.view.width || copy.origin.y > this.view.height) {
        copy.origin = Coordinate.copy(pastedBuffer[0].origin);
        this.pasteOffset = 0;
      }
      copies.push(copy);
      pastedBuffer.push(copy);
    });
    return copies;
  }
  pasteClipboard(buffer: BaseShape[] = this.clipboard, pastedBuffer: BaseShape[] = this.pastedBuffer): void {
    if (buffer.length > 0) {
      this.clearSelection();
      const copies = this.offsetCopies(buffer, pastedBuffer);
      this.commandReceiver.add(new AddShapesCommand(copies, this));
      // todo : This must be illegal... Right?
      for (let i = pastedBuffer.length - buffer.length; i < pastedBuffer.length; i++) {
        (this.tools.get(ToolType.Select) as SelectionTool).addSelectedShape(pastedBuffer[i]);
      }
      this.pasteOffset += SelectionTool.PASTED_OFFSET;
      (this.tools.get(ToolType.Select) as SelectionTool).updateBoundingBox();
      (this.tools.get(ToolType.Select) as SelectionTool).applyBoundingBox();
    }
  }
  cutSelectedShapes(): void {
    if (this.selectedShapes.length > 0) {
      this.pasteOffset = SelectionTool.PASTED_OFFSET;
      this.clearClipboard();
      this.pastedBuffer.length = 0;
      this.selectedShapes.forEach((shape: BaseShape) => {
        this.clipboard.push(shape);
        this.commandReceiver.add(new RemoveShapesCommand(shape, this));
      });
      this.clearSelection();
      (this.tools.get(ToolType.Select) as SelectionTool).updateBoundingBox();
    }
  }
  copySelectedShapes(buffer: BaseShape[] = this.clipboard, pastedBuffer: BaseShape[] = this.pastedBuffer): void {
    if (this.selectedShapes.length > 0) {
      this.pasteOffset = SelectionTool.PASTED_OFFSET;
      buffer.length = 0;
      pastedBuffer.length = 0;
      this.selectedShapes.forEach((shape: BaseShape) => {
        buffer.push(shape.copy);
      });
    }
  }
  duplicateSelectedShapes(): void {
    // this.copySelectedShapes(this.duplicationBuffer, this.pastedDuplicateBuffer);
    this.pasteClipboard(this.duplicationBuffer, this.pastedDuplicateBuffer);
  }
  deleteSelectedShapes(): void {
    if (this.selectedShapes.length > 0) {
      this.deletedBuffer.push(...this.selectedShapes);
      this.commandReceiver.add(new RemoveShapesCommand(this.deletedBuffer, this));
      this.clearSelection();
      (this.tools.get(ToolType.Select) as SelectionTool).updateBoundingBox();
      (this.tools.get(ToolType.Select) as SelectionTool).applyBoundingBox();
    }
  }
  selectAll(): void {
    (this.tools.get(ToolType.Select) as SelectionTool).selectAll();
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

  clearClipboard(): void {
    this.clipboard.length = 0;
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
    if (shapes.findIndex((shape: BaseShape) => shape.state !== ShapeStates.PASTED) === -1) {
      this.pasteOffset -= SelectionTool.PASTED_OFFSET;
    }
    shapes.forEach(this.removeShape, this);
  }

  removeShapeFromView(shape: BaseShape): void {
    this.view.removeShape(shape);
  }

  removeShape(shape: BaseShape): void {
    let index = this.shapes.findIndex((s) => s === shape);
    if (index !== -1) {
      this.shapes.splice(index, 1);
      this.removeShapeFromView(shape);
    }
    index = this.pastedBuffer.findIndex((s) => s === shape);
    if (index !== -1) {
      this.pastedBuffer.splice(index, 1);
    }
    index = this.pastedDuplicateBuffer.findIndex((s) => s === shape);
    if (index !== -1) {
      this.pastedDuplicateBuffer.splice(index, 1);
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
