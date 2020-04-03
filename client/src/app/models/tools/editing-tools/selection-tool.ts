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
  private readonly KEYBOARD_MOVE_DISTANCE: number = 3;
  private readonly KEYBOARD_TIMEOUT: number = 500; // todo - move to enum?
  private readonly KEYBOARD_INTERVAL: number = 100;
  private readonly KEYBOARD_MOVE_RIGHT: Coordinate = new Coordinate(this.KEYBOARD_MOVE_DISTANCE, 0);
  private readonly KEYBOARD_MOVE_DOWN: Coordinate = new Coordinate(0, this.KEYBOARD_MOVE_DISTANCE);

  private boundingBox: BoundingBox;
  private selectArea: Rectangle;
  private initialMouseCoord: Coordinate;
  private reverseSelectionMode: boolean; // todo - create states
  private moveSelectionMode: boolean;
  private previouslySelectedShapes: BaseShape[];

  private keyPresses: boolean[] = [];
  // private initialMoveCoord: Coordinate;
  private moveShapes: BaseShape[];
  private moveCoords: Coordinate[];
  private keyInterval: number;
  private keyTimeout: number;

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
    ]);
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
        this.moveSelectionMode = false; // todo - move?
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
    if (this.isActive) {
      if (!this.keyTimeout) {
        let keyMoveDelta = this.calculateKeyboardMove(this.keyPresses);
        this.startMove();
        this.move(keyMoveDelta);
        this.keyTimeout = window.setTimeout(() => {
          this.keyInterval = window.setInterval(() => {
            keyMoveDelta = Coordinate.add(keyMoveDelta, this.calculateKeyboardMove(this.keyPresses));
            this.move(keyMoveDelta);
          }, this.KEYBOARD_INTERVAL);
        }, this.KEYBOARD_TIMEOUT);
      }
    } else {
      if (this.keyTimeout) {
        window.clearTimeout(this.keyTimeout);
        this.keyTimeout = 0;
      }
      if (this.keyInterval) {
        window.clearInterval(this.keyInterval);
        this.keyInterval = 0;
      }
    }
  }

  private startMove(c: Coordinate = new Coordinate()): void {
    // this.initialMoveCoord = this.boundingBox.origin;
    this.initialMouseCoord = Coordinate.copy(c);
    this.moveSelectionMode = true;
    this.moveShapes = new Array<BaseShape>();
    this.moveCoords = new Array<Coordinate>();
    this.moveShapes.push(...this.editorService.selectedShapes);
    this.moveShapes.push(this.boundingBox);
    this.moveShapes.forEach((shape) => {
      this.moveCoords.push(Coordinate.copy(shape.origin));
    });
  }

  private move(delta: Coordinate = Coordinate.substract(this.mousePosition, this.initialMouseCoord)): void {
    this.moveShapes.forEach((shape, index) => {
      shape.origin = Coordinate.add(this.moveCoords[index], delta);
    });
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
    this.selectArea.svgNode.style.pointerEvents = 'none';
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
