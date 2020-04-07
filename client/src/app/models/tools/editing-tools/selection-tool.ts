/* tslint:disable:max-file-line-count */ // todo : distribute functionnality into multiple subtool
import { AddShapesCommand } from '@models/commands/shape-commands/add-shapes-command';
import { MoveShapeCommand } from '@models/commands/shape-commands/move-shape-command';
import { SimpleSelectionTool } from 'src/app/models/tools/editing-tools/simple-selection-tool';
import { EditorService } from 'src/app/services/editor.service';
import { KeyboardListenerService } from 'src/app/services/event-listeners/keyboard-listener/keyboard-listener.service';
import { MouseListenerService } from 'src/app/services/event-listeners/mouse-listener/mouse-listener.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { BaseShape } from '../../shapes/base-shape';
import { BoundingBox } from '../../shapes/bounding-box';
import { Rectangle } from '../../shapes/rectangle';
import { SelectionMove } from './selection-move.enum';

export class SelectionTool extends SimpleSelectionTool {
  private readonly KEYBOARD_MOVE_RIGHT: Coordinate = new Coordinate(SelectionMove.KEYBOARD_MOVE_DISTANCE, 0);
  private readonly KEYBOARD_MOVE_DOWN: Coordinate = new Coordinate(0, SelectionMove.KEYBOARD_MOVE_DISTANCE);
  private readonly SELECT_AREA_DASHARRAY: string = '5';
  private readonly PASTED_OFFSET: number = 5;
  private boundingBox: BoundingBox;
  private selectArea: Rectangle;
  private initialMouseCoord: Coordinate;
  private reverseSelectionMode: boolean; // todo - create states
  private moveSelectionMode: boolean;
  private previouslySelectedShapes: BaseShape[];
  private nbPasted: number;
  private keyPresses: boolean[] = [];
  private keyInterval: number;
  private keyTimeout: number;
  private moveCommand: MoveShapeCommand;

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
    this.nbPasted = 1;
    this.keyboardListener.addEvents([
      [
        KeyboardListenerService.getIdentifier('ArrowUp'),
        () => {
          this.handleKeyboardMove(SelectionMove.UP, true);
        },
      ],
      [
        KeyboardListenerService.getIdentifier('ArrowUp', false, false, 'keyup'),
        () => {
          this.handleKeyboardMove(SelectionMove.UP, false);
        },
      ],
      [
        KeyboardListenerService.getIdentifier('ArrowRight'),
        () => {
          this.handleKeyboardMove(SelectionMove.RIGHT, true);
        },
      ],
      [
        KeyboardListenerService.getIdentifier('ArrowRight', false, false, 'keyup'),
        () => {
          this.handleKeyboardMove(SelectionMove.RIGHT, false);
        },
      ],
      [
        KeyboardListenerService.getIdentifier('ArrowDown'),
        () => {
          this.handleKeyboardMove(SelectionMove.DOWN, true);
        },
      ],
      [
        KeyboardListenerService.getIdentifier('ArrowDown', false, false, 'keyup'),
        () => {
          this.handleKeyboardMove(SelectionMove.DOWN, false);
        },
      ],
      [
        KeyboardListenerService.getIdentifier('ArrowLeft'),
        () => {
          this.handleKeyboardMove(SelectionMove.LEFT, true);
        },
      ],
      [
        KeyboardListenerService.getIdentifier('ArrowLeft', false, false, 'keyup'),
        () => {
          this.handleKeyboardMove(SelectionMove.LEFT, false);
        },
      ],
      [
        KeyboardListenerService.getIdentifier('c', true, false, 'keyup'),
        () => {
          this.copySelectedShapes();
        },
      ],
      [
        KeyboardListenerService.getIdentifier('v', true, false, 'keyup'),
        () => {
          this.pasteClipboard();
        },
      ],
      [
        KeyboardListenerService.getIdentifier('x', true, false, 'keyup'),
        () => {
          this.cutSelectedShapes();
        },
      ],
      [
        KeyboardListenerService.getIdentifier('d', false, true, 'keyup'),
        () => {
          this.duplicateSelectedShapes();
        },
      ],
    ]);
  }
  // todo : fix boundingbox shifting
  // todo : add missing copy implementation
  // todo : implement "do not modify clipboard on duplicate"
  // todo : fix invisible selection after operation
  pasteClipboard(buffer: BaseShape[] = this.editorService.clipboard): void {
    if (buffer.length > 0) {
      this.editorService.clearSelection();
      const pastedShapes = Array<BaseShape>();
      buffer.forEach((shape: BaseShape) => {
        const copy = shape.copy;
        copy.offset = new Coordinate(this.nbPasted * this.PASTED_OFFSET, this.nbPasted * this.PASTED_OFFSET);
        pastedShapes.push(copy);
        this.nbPasted++;
      });
      this.editorService.commandReceiver.add(new AddShapesCommand(pastedShapes, this.editorService));
      pastedShapes.forEach((shape: BaseShape) => {
        this.editorService.selectedShapes.push(shape);
      });
      this.updateBoundingBox();
    }
  }

  cutSelectedShapes(): void {
    if (this.editorService.selectedShapes.length > 0) {
      this.editorService.clearClipboard();
      this.editorService.selectedShapes.forEach((shape: BaseShape) => {
        this.editorService.clipboard.push(shape);
        this.editorService.removeShape(shape);
      });
      this.editorService.clearSelection();
      this.updateBoundingBox();
    }
  }

  copySelectedShapes(buffer: BaseShape[] = this.editorService.clipboard): void {
    if (this.editorService.selectedShapes.length > 0) {
      this.editorService.clearClipboard();
      this.editorService.selectedShapes.forEach((shape: BaseShape) => {
        buffer.push(shape.copy);
      });
    }
  }

  duplicateSelectedShapes(): void {
    this.copySelectedShapes();
    this.pasteClipboard();
  }

  initMouseHandler(): void {
    this.handleMouseDown = (e: MouseEvent) => {
      if (!this.isActive) {
        this.isActive = true;
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
      result = Coordinate.substract(result, this.KEYBOARD_MOVE_DOWN);
    }
    if (keyPresses[SelectionMove.RIGHT]) {
      result = Coordinate.add(result, this.KEYBOARD_MOVE_RIGHT);
    }
    if (keyPresses[SelectionMove.DOWN]) {
      result = Coordinate.add(result, this.KEYBOARD_MOVE_DOWN);
    }
    if (keyPresses[SelectionMove.LEFT]) {
      result = Coordinate.substract(result, this.KEYBOARD_MOVE_RIGHT);
    }
    return result;
  }

  private handleKeyboardMove(key: number, isDown: boolean): void {
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

  private move(delta: Coordinate = Coordinate.substract(this.mousePosition, this.initialMouseCoord)): void {
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

  private applyBoundingBox(): void {
    this.editorService.clearShapesBuffer();
    this.editorService.addPreviewShape(this.boundingBox);
  }

  private reverseSelection(shape: BaseShape, array: BaseShape[] = this.editorService.selectedShapes): void {
    array.indexOf(shape) === -1 ? this.addSelectedShape(shape) : this.removeSelectedShape(shape);
    this.updateBoundingBox();
  }

  private addSelectedShape(shape: BaseShape): void {
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

  private updateBoundingBox(): void {
    if (this.editorService.selectedShapes.length > 0) {
      this.boundingBox.origin = this.editorService.selectedShapes[0].origin;
      this.boundingBox.end = this.editorService.selectedShapes[0].end;
      this.editorService.selectedShapes.forEach((shape) => {
        this.boundingBox.start = Coordinate.minXYCoord(this.boundingBox.origin, shape.origin);
        this.boundingBox.end = Coordinate.maxXYCoord(this.boundingBox.end, shape.end);
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
