import { ContourType } from '@tool-properties/creator-tool-properties/contour-type.enum';
import { EraserToolProperties } from '@tool-properties/editor-tool-properties/eraser-tool-properties';
import { RemoveShapesCommand } from 'src/app/models/commands/shape-commands/remove-shapes-command';
import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Rectangle } from 'src/app/models/shapes/rectangle';
import { EraserUtils } from 'src/app/models/tools/editing-tools/eraser-tool/eraser-utils';
import { PipetteTool } from 'src/app/models/tools/other-tools/pipette-tool';
import { Tool } from 'src/app/models/tools/tool';
import { EditorService } from 'src/app/services/editor.service';
import { ImageExportService } from 'src/app/services/image-export.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class EraserTool extends Tool {
  private eraserView: Rectangle;
  private ctx: CanvasRenderingContext2D | undefined;
  // private selectedIndexes: number[];
  private selectedIndex: number;
  private removedShapes: BaseShape[];
  private clonedView: SVGElement | undefined;

  toolProperties: EraserToolProperties;

  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new EraserToolProperties();
    this.removedShapes = [];
  }

  private erase(shape: BaseShape | undefined): void {
    if (shape) {
      this.editorService.removeShapeFromView(shape);
      this.removedShapes.push(shape);
      this.ctx = undefined;
      this.clonedView = undefined;
      this.init();
      // (document.querySelector('body') as HTMLElement).style.cursor = `url('${image.src}') , auto`;
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

    // @ts-ignore
    // this.editorService.view.svg.parentElement.appendChild(asvgCopy);// todo

    this.clonedView = newClonedView;
    // this.ctx = undefined;

    console.log('A');
    ImageExportService.viewToCanvas(this.editorService.view, this.clonedView).then((ctx) => {
      ctx.imageSmoothingEnabled = false;
      this.ctx = ctx;
      if (!ctx) {
        throw new Error('Canvas context could not be loaded');
      }
      if (!this.eraserView) {
        // todo: check if in buffer
        this.initEraserView();
      }
      console.log('C');
    });
    console.log('B');
    // }
  }

  selectShapes(pos: Coordinate): void {
    if (!this.clonedView) {
      this.init();
    }
    const { x, y } = pos;
    // this.selectedIndexes = [];
    this.selectedIndex = -1;
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

          // if (index >= 0 && this.selectedIndexes.indexOf(index) === -1) {
          if (index >= this.selectedIndex) {
            this.selectedIndex = Math.round(index);
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
        // console.log('D');
      }

      this.selectShapes(this.eraserPosition);
      // console.log('E');

      // this.selectedIndexes.sort();
      // const highlightedIndex = this.selectedIndexes.pop();
      const highlightedIndex = this.selectedIndex;

      this.editorService.shapes.filter((s) => s.svgNode.id !== `shape-${highlightedIndex}`).forEach((shape) => shape.updateProperties());

      if (highlightedIndex !== -1) {
        const shape = this.editorService.shapes.filter((s) => s.svgNode.id === `shape-${highlightedIndex}`)[0];
        if (shape) {
          EraserUtils.highlightShape(shape);
        }
        if (this.isActive) {
          this.erase(shape);
        }
      }
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

  handleUndoRedoEvent(undo: boolean): void {
    super.handleUndoRedoEvent(undo);
    this.init();
  }

  initEraserView(): void {
    this.eraserView = new Rectangle(this.eraserPosition, this.size);
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
}
