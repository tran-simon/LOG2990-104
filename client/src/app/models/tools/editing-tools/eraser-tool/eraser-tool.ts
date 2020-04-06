import { DrawingSurfaceComponent } from '@components/pages/editor/drawing-surface/drawing-surface.component';
import { ContourType } from '@tool-properties/creator-tool-properties/contour-type.enum';
import { EraserToolProperties } from '@tool-properties/editor-tool-properties/eraser-tool-properties';
import { EditorUtil } from '@utils/color/editor-util';
import { RemoveShapesCommand } from 'src/app/models/commands/shape-commands/remove-shapes-command';
import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Rectangle } from 'src/app/models/shapes/rectangle';
import { EraserUtils } from 'src/app/models/tools/editing-tools/eraser-tool/eraser-utils';
import { Tool } from 'src/app/models/tools/tool';
import { EditorService } from 'src/app/services/editor.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class EraserTool extends Tool {
  private readonly eraserView: Rectangle;
  private ctx: CanvasRenderingContext2D | undefined;
  private selectedIndexes: number[];
  private removedShapes: BaseShape[];
  private clonedView: SVGElement | undefined;

  toolProperties: EraserToolProperties;

  constructor(public editorService: EditorService) {
    super(editorService);
    this.toolProperties = new EraserToolProperties();
    this.removedShapes = [];
    this.eraserView = new Rectangle(this.eraserPosition, this.size);
  }

  private erase(shape: BaseShape | undefined): void {
    if (shape) {
      this.editorService.removeShapeFromView(shape);
      this.removedShapes.push(shape);
      this.ctx = undefined;
      this.clonedView = undefined;
      this.init();
    }
  }

  init(): void {
    const newClonedView = this.editorService.view.svg.cloneNode(true) as SVGElement;

    const background = newClonedView.querySelector('#background');
    if (background) {
      background.setAttribute('fill', Color.RED.rgbString);
    }

    newClonedView.childNodes.forEach((node: SVGElement) => {
      if (node.id.startsWith('shape-')) {
        const id = node.id.split('-')[1];
        EraserUtils.sanitizeAndAssignColorToSvgNode(node, +id + 1);
      }
    });

    this.clonedView = newClonedView;

    EditorUtil.viewToCanvas(this.editorService.view, this.clonedView).then((ctx) => {
      if (ctx) {
        ctx.imageSmoothingEnabled = false;
      }
      this.ctx = ctx;
      if (!this.editorService.view.svg.contains(this.eraserView.svgNode)) {
        this.initEraserView();
      }
    });
  }

  selectShapes(pos: Coordinate): void {
    const { x, y } = pos;
    this.selectedIndexes = [];
    if (this.ctx) {
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          const color = EditorUtil.colorAtPointInCanvas(this.ctx, new Coordinate(x + i, y + j));

          /* ignore the color if there's red (to avoid issues with antialiasing) */
          if (color.r > 0) {
            continue;
          }

          const index = EraserUtils.indexFromColor(color) - 1;
          const delta = Math.abs(index - Math.round(index));
          if (delta > EraserUtils.TOLERANCE) {
            continue;
          }

          if (index >= 0 && this.selectedIndexes.indexOf(index) === -1) {
            this.selectedIndexes.push(Math.round(index));
          }
        }
      }
    }
  }

  initMouseHandler(): void {
    this.handleMouseMove = () => {
      if (this.eraserView) {
        this.eraserView.primaryColor = Color.WHITE;
        this.eraserView.height = this.size;
        this.eraserView.width = this.size;
        this.eraserView.origin = this.eraserPosition;
        this.eraserView.updateProperties();
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

    this.handleMouseDown = (e) => {
      this.isActive = true;
      this.handleMouseMove(e);
    };
    this.handleMouseLeave = this.handleMouseUp;
  }

  updateSelection(): void {
    this.selectShapes(this.eraserPosition);

    this.getShapesNotSelected().forEach((shape) => shape.updateProperties());

    this.selectedIndexes.forEach(this.highlightShapeForId, this);
  }

  getShapesNotSelected(): BaseShape[] {
    return this.editorService.shapes.filter((s) => this.selectedIndexes.indexOf(s.id) === -1);
  }

  highlightShapeForId(id: number): void {
    const shape = this.editorService.findShapeById(DrawingSurfaceComponent.SHAPE_ID_PREFIX + id);
    if (shape) {
      EraserUtils.highlightShape(shape);
      if (this.isActive) {
        this.erase(shape);
      }
    }
  }

  handleUndoRedoEvent(undo: boolean): void {
    super.handleUndoRedoEvent(undo);
    this.init();
  }

  initEraserView(): void {
    this.eraserView.primaryColor = Color.TRANSPARENT;
    this.eraserView.contourType = ContourType.FILLED;
    this.eraserView.updateProperties();

    this.editorService.addPreviewShape(this.eraserView);
  }

  get eraserPosition(): Coordinate {
    const x = this.mousePosition.x - this.size / 2;
    const y = this.mousePosition.y - this.size / 2;
    return new Coordinate(x, y);
  }

  get size(): number {
    return this.toolProperties.eraserSize.value;
  }

  onSelect(): void {
    super.onSelect();
    this.init();
    this.initEraserView();
  }
}
