/* tslint:disable:max-file-line-count */ // todo : distribute functionality into multiple sub-tool
import { MoveShapeCommand } from '@models/commands/shape-commands/move-shape-command';
import { RotateShapeCommand } from '@models/commands/shape-commands/rotate-shape-command';
import { EditorService } from '@services/editor.service';
import { MouseListenerService } from '@services/event-listeners/mouse-listener/mouse-listener.service';
import { SelectionMove } from '@tools/editing-tools/selection-tool/selection-move.enum';
import { SelectionToolKeyboardEvents } from '@tools/editing-tools/selection-tool/selection-tool-keyboard-events';
import { SimpleSelectionTool } from '@tools/editing-tools/simple-selection-tool';
import { Color } from '@utils/color/color';
import { Coordinate } from '@utils/math/coordinate';
import { BaseShape } from 'src/app/models/shapes/base-shape';
import { BoundingBox } from 'src/app/models/shapes/bounding-box';
import { Rectangle } from 'src/app/models/shapes/rectangle';

export class SelectionTool extends SimpleSelectionTool {
  static readonly PASTED_OFFSET: number = 10;
  private readonly KEYBOARD_MOVE_RIGHT: Coordinate = new Coordinate(SelectionMove.KEYBOARD_MOVE_DISTANCE, 0);
  private readonly KEYBOARD_MOVE_DOWN: Coordinate = new Coordinate(0, SelectionMove.KEYBOARD_MOVE_DISTANCE);
  private readonly SELECT_AREA_DASHARRAY: string = '5';

  private boundingBox: BoundingBox;
  private selectArea: Rectangle;
  private initialMouseCoord: Coordinate;
  private reverseSelectionMode: boolean; // todo - create states
  private moveSelectionMode: boolean;
  previouslySelectedShapes: BaseShape[];

  private keyPresses: boolean[] = [];
  private keyInterval: number;
  private keyTimeout: number;
  private moveCommand: MoveShapeCommand;

  private readonly ROTATION_AMOUNT: number = 15;
  shiftKey: boolean;
  altKey: boolean;

  static detectBoundingBoxCollision(area: Rectangle, shape: BaseShape): boolean {
    return !(area.end.x < shape.origin.x || area.end.y < shape.origin.y || area.origin.x > shape.end.x || area.origin.y > shape.end.y);
  }

  static detectPointCollision(point: Coordinate, shape: BaseShape): boolean {
    return point.x >= shape.origin.x && point.x <= shape.end.x && point.y >= shape.origin.y && point.y <= shape.end.y;
  }

  constructor(public editorService: EditorService) {
    super(editorService);
    this.reverseSelectionMode = false;
    this.previouslySelectedShapes = new Array<BaseShape>();

    this.shiftKey = false;
    this.altKey = false;

    this.keyboardListener.addEvents(SelectionToolKeyboardEvents.generateEvents(this));
  }

  handleUndoRedoEvent(undo: boolean): void {
    super.handleUndoRedoEvent(undo);
    this.editorService.clearSelection();
    this.updateBoundingBox();
    this.applyBoundingBox();
  }

  private rotateSelection(angle: number, individual: boolean = false): void {
    const center = individual ? undefined : this.boundingBox.center;
    const shapes = new Array<BaseShape>();
    shapes.push(...this.editorService.selectedShapes);
    const rotationCommand = new RotateShapeCommand(shapes, this.editorService, angle, center);

    this.editorService.commandReceiver.add(rotationCommand);
    this.boundingBox.rotation += angle;
  }

  // END ROTATION

  initMouseHandler(): void {
    this.handleWheel = (e: WheelEvent) => {
      let angle = this.altKey ? 1 : this.ROTATION_AMOUNT;
      if (e.deltaY < 0) {
        angle = -angle;
      }
      this.rotateSelection(angle, this.shiftKey);
    };

    this.handleMouseDown = (e: MouseEvent) => {
      if (!this.isActive) {
        this.isActive = true;
        this.editorService.duplicationBuffer.length = 0;
        if (this.boundingBox && SelectionTool.detectPointCollision(this.mousePosition, this.boundingBox)) {
          this.startMove(this.mousePosition);
        } else if (e.button === MouseListenerService.BUTTON_LEFT) {
          this.beginSelection(this.mousePosition);
        } else if (e.button === MouseListenerService.BUTTON_RIGHT) {
          this.beginReverseSelection(this.mousePosition);
        }
      }
    };

    this.handleMouseMove = () => {
      if (this.isActive) {
        this.moveSelectionMode ? this.move() : this.updateSelection(this.reverseSelectionMode);
      }
    };

    this.handleMouseUp = () => {
      if (this.isActive) {
        this.isActive = false;
        this.editorService.copySelectedShapes(this.editorService.duplicationBuffer, this.editorService.pastedDuplicateBuffer);
        this.applyBoundingBox();
        if (this.moveSelectionMode) {
          this.moveSelectionMode = false;
          this.endMove();
        }
        this.applyBoundingBox();
      }
    };
  }

  private calculateKeyboardMove(keyPresses: boolean[]): Coordinate {
    let result = new Coordinate();
    if (keyPresses[SelectionMove.UP]) {
      result = Coordinate.subtract(result, this.KEYBOARD_MOVE_DOWN);
    }
    if (keyPresses[SelectionMove.RIGHT]) {
      result = Coordinate.add(result, this.KEYBOARD_MOVE_RIGHT);
    }
    if (keyPresses[SelectionMove.DOWN]) {
      result = Coordinate.add(result, this.KEYBOARD_MOVE_DOWN);
    }
    if (keyPresses[SelectionMove.LEFT]) {
      result = Coordinate.subtract(result, this.KEYBOARD_MOVE_RIGHT);
    }
    return result;
  }

  handleKeyboardMove(key: number, isDown: boolean): void {
    this.keyPresses[key] = isDown;
    this.isActive = false;
    this.keyPresses.forEach((isActive) => {
      this.isActive = this.isActive || isActive;
    });
    this.isActive ? this.startKeyboardMove() : this.endKeyboardMove();
  }

  private startKeyboardMove(): void {
    if (this.keyTimeout) {
      return;
    }
    let keyMoveDelta = this.calculateKeyboardMove(this.keyPresses);
    this.startMove();
    this.move(keyMoveDelta);

    this.keyTimeout = window.setTimeout(() => {
      this.keyInterval = window.setInterval(() => {
        keyMoveDelta = Coordinate.add(keyMoveDelta, this.calculateKeyboardMove(this.keyPresses));
        this.move(keyMoveDelta);
      }, SelectionMove.KEYBOARD_INTERVAL);
    }, SelectionMove.KEYBOARD_TIMEOUT - SelectionMove.KEYBOARD_INTERVAL);
  }

  private endKeyboardMove(): void {
    this.endMove();
    window.clearTimeout(this.keyTimeout);
    this.keyTimeout = 0;
    window.clearInterval(this.keyInterval);
    this.keyInterval = 0;
  }

  private startMove(c: Coordinate = new Coordinate()): void {
    this.initialMouseCoord = Coordinate.copy(c);
    this.moveSelectionMode = true;

    const moveShapes = new Array<BaseShape>();
    moveShapes.push(...this.editorService.selectedShapes);
    moveShapes.push(this.boundingBox);
    this.moveCommand = new MoveShapeCommand(moveShapes, this.editorService);
  }

  private move(delta: Coordinate = Coordinate.subtract(this.mousePosition, this.initialMouseCoord)): void {
    this.moveCommand.delta = delta;
    this.moveCommand.execute();
  }

  private endMove(): void {
    this.editorService.commandReceiver.add(this.moveCommand);
  }

  selectShape(shape: BaseShape, rightClick: boolean = false): void {
    if (rightClick) {
      this.reverseSelection(shape);
    } else {
      this.resetSelection();
      this.addSelectedShape(shape);
      this.updateBoundingBox();
    }
    this.applyBoundingBox();
    this.editorService.copySelectedShapes(this.editorService.duplicationBuffer, this.editorService.pastedDuplicateBuffer);
  }

  selectAll(): void {
    this.resetSelection();
    this.editorService.selectedShapes.push(...this.editorService.shapes);
    this.updateBoundingBox();
  }

  private beginSelection(c: Coordinate): void {
    this.reverseSelectionMode = false;
    this.initialMouseCoord = Coordinate.copy(c);
    this.resetSelection();
  }

  private beginReverseSelection(c: Coordinate): void {
    this.reverseSelectionMode = true;
    this.initialMouseCoord = Coordinate.copy(c);
    this.initSelectArea();
    this.previouslySelectedShapes.length = 0;
    this.previouslySelectedShapes.push(...this.editorService.selectedShapes);
  }

  private initSelectArea(): void {
    this.selectArea = new Rectangle(this.initialMouseCoord);
    this.selectArea.primaryColor = Color.TRANSPARENT;
    this.selectArea.svgNode.style.pointerEvents = BaseShape.CSS_NONE;
    this.selectArea.svgNode.style.strokeDasharray = this.SELECT_AREA_DASHARRAY;
    this.selectArea.updateProperties();
    this.editorService.addPreviewShape(this.selectArea);
  }

  private initBoundingBox(): void {
    this.boundingBox = new BoundingBox(this.initialMouseCoord);
    this.editorService.addPreviewShape(this.boundingBox);
  }

  private resetSelection(): void {
    this.editorService.clearShapesBuffer();
    this.editorService.clearSelection();
    this.initSelectArea();
    this.initBoundingBox();
  }

  applyBoundingBox(): void {
    this.editorService.clearShapesBuffer();
    this.editorService.addPreviewShape(this.boundingBox);
  }

  private reverseSelection(shape: BaseShape, array: BaseShape[] = this.editorService.selectedShapes): void {
    array.indexOf(shape) === -1 ? this.addSelectedShape(shape) : this.removeSelectedShape(shape);
    this.updateBoundingBox();
  }

  addSelectedShape(shape: BaseShape): void {
    const index = this.editorService.selectedShapes.indexOf(shape);
    if (index === -1) {
      this.editorService.selectedShapes.push(shape);
    }
  }

  private removeSelectedShape(shape: BaseShape): void {
    const index = this.editorService.selectedShapes.indexOf(shape);
    if (index !== -1) {
      this.editorService.selectedShapes.splice(index, 1);
    }
  }

  private updateSelection(reverse: boolean = this.reverseSelectionMode): void {
    this.resetSelection();
    this.resizeSelectArea();

    if (reverse) {
      this.editorService.selectedShapes.push(...this.previouslySelectedShapes);
    }

    this.editorService.shapes.forEach((shape) => {
      if (SelectionTool.detectBoundingBoxCollision(this.selectArea, shape)) {
        reverse ? this.reverseSelection(shape, this.previouslySelectedShapes) : this.addSelectedShape(shape);
      }
    });
    this.updateBoundingBox();
  }

  updateBoundingBox(): void {
    if (this.editorService.selectedShapes.length > 0) {
      this.boundingBox.origin = this.editorService.selectedShapes[0].origin;
      this.boundingBox.end = this.editorService.selectedShapes[0].end;
      this.editorService.selectedShapes.forEach((shape) => {
        this.boundingBox.start = Coordinate.minXYCoord(
          this.boundingBox.origin,
          Coordinate.subtract(shape.origin, new Coordinate(shape.strokeWidth / 2, shape.strokeWidth / 2)),
        );
        this.boundingBox.end = Coordinate.maxXYCoord(
          this.boundingBox.end,
          Coordinate.add(shape.end, new Coordinate(shape.strokeWidth / 2, shape.strokeWidth / 2)),
        );
      });
    } else {
      this.boundingBox.origin = new Coordinate();
      this.boundingBox.end = new Coordinate();
    }
  }

  private resizeSelectArea(origin: Coordinate = this.initialMouseCoord, end: Coordinate = this.mousePosition): void {
    this.selectArea.origin = origin;
    this.selectArea.end = end;
  }
}
