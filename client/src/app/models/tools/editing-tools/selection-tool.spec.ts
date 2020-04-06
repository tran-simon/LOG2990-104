import { TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { EditorService } from 'src/app/services/editor.service';
import { MouseListenerService } from 'src/app/services/event-listeners/mouse-listener/mouse-listener.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { BaseShape } from '../../shapes/base-shape';
import { Rectangle } from '../../shapes/rectangle';
import { SelectionMove } from './selection-move.enum';
import { SelectionTool } from './selection-tool';

/* tslint:disable:no-string-literal */
/* tslint:disable:no-magic-numbers */
/* tslint:disable:no-any */
/* tslint:disable:max-file-line-count */

const mouseDown = (c: Coordinate = new Coordinate(), rightClick: boolean = false): MouseEvent => {
  return {
    button: rightClick ? MouseListenerService.BUTTON_RIGHT : MouseListenerService.BUTTON_LEFT,
    type: 'mousedown',
    offsetX: c.x,
    offsetY: c.y,
  } as MouseEvent;
};

const mouseMove = (c: Coordinate = new Coordinate()): MouseEvent => {
  return {
    type: 'mousemove',
    offsetX: c.x,
    offsetY: c.y,
  } as MouseEvent;
};

const mouseUp = (c: Coordinate = new Coordinate()): MouseEvent => {
  return {
    type: 'mouseup',
    offsetX: c.x,
    offsetY: c.y,
  } as MouseEvent;
};

describe('SelectionTool', () => {
  let tool: SelectionTool;
  const coord1 = new Coordinate(100, 50);
  const coord2 = new Coordinate(150, 250);
  const coord3 = new Coordinate(50, 150);

  const shapes: BaseShape[] = [
    new Rectangle(coord1, 5, 5),
    new Rectangle(coord2, 50, 50),
    new Rectangle(coord3, 20, 20),
    new Rectangle(coord1, 200, 150),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [EditorService],
    }).compileComponents();

    tool = new SelectionTool(TestBed.get(EditorService));
  });

  it('should create an instance', () => {
    expect(tool).toBeTruthy();
  });

  it('can handle mouse down', () => {
    const beginSpy = spyOn<any>(tool, 'beginSelection');
    const beginReverseSpy = spyOn<any>(tool, 'beginReverseSelection');

    tool.handleMouseEvent(mouseDown(coord1, false));
    expect(tool['isActive']).toBeTruthy();
    expect(beginSpy).toHaveBeenCalledWith(coord1);

    tool.handleMouseDown(mouseDown(coord1, false));
    expect(beginSpy).toHaveBeenCalledTimes(1);

    tool['isActive'] = false;

    tool.handleMouseEvent(mouseDown(coord1, true));
    expect(tool['isActive']).toBeTruthy();
    expect(beginReverseSpy).toHaveBeenCalledWith(coord1);
  });

  it('can handle mouse move', () => {
    const updateSpy = spyOn<any>(tool, 'updateSelection');

    tool.handleMouseEvent(mouseMove());
    expect(updateSpy).not.toHaveBeenCalled();

    tool['isActive'] = true;
    tool.handleMouseEvent(mouseMove());
    expect(updateSpy).toHaveBeenCalledTimes(1);

    tool['reverseSelectionMode'] = true;
    tool.handleMouseEvent(mouseMove());
    expect(updateSpy).toHaveBeenCalledWith(true);
  });

  it('can handle mouse up', () => {
    const applySpy = spyOn<any>(tool, 'applyBoundingBox');

    tool.handleMouseEvent(mouseUp());
    expect(applySpy).not.toHaveBeenCalled();

    tool['isActive'] = true;
    tool.handleMouseEvent(mouseUp());
    expect(applySpy).toHaveBeenCalled();
    expect(tool['isActive']).toBeFalsy();
  });

  it('can calculate keyboard move', () => {
    const up = [true, false, false, false];
    const upRight = [true, true, false, false];
    const upRightDown = [true, true, true, false];
    const upRightDownLeft = [true, true, true, true];
    const dist = SelectionMove.KEYBOARD_MOVE_DISTANCE;

    expect(tool['calculateKeyboardMove'](up)).toEqual(new Coordinate(0, -dist));
    expect(tool['calculateKeyboardMove'](upRight)).toEqual(new Coordinate(dist, -dist));
    expect(tool['calculateKeyboardMove'](upRightDown)).toEqual(new Coordinate(dist, 0));
    expect(tool['calculateKeyboardMove'](upRightDownLeft)).toEqual(new Coordinate(0, 0));
  });

  it('can handle keyboard move', () => {
    const startSpy = spyOn<any>(tool, 'startKeyboardMove');
    const endSpy = spyOn<any>(tool, 'endKeyboardMove');

    tool['handleKeyboardMove'](0, false); // end
    tool['handleKeyboardMove'](1, true); // start
    tool['handleKeyboardMove'](0, true); // start
    tool['handleKeyboardMove'](1, false); // start
    tool['handleKeyboardMove'](0, false); // end

    expect(startSpy).toHaveBeenCalledTimes(3);
    expect(endSpy).toHaveBeenCalledTimes(2);
  });

  it('can start keyboard move', () => {
    jasmine.clock().install();
    const moveSpy = spyOn<any>(tool, 'move');
    tool['initBoundingBox']();
    tool.editorService.selectedShapes.push(new Rectangle());
    tool['startKeyboardMove']();
    expect(moveSpy).toHaveBeenCalledTimes(1);

    jasmine.clock().tick(SelectionMove.KEYBOARD_TIMEOUT + 5);
    expect(moveSpy).toHaveBeenCalledTimes(2);
    jasmine.clock().tick(SelectionMove.KEYBOARD_INTERVAL + 5);
    expect(moveSpy).toHaveBeenCalledTimes(3);

    jasmine.clock().uninstall();
  });

  it('can end keyboard move', () => {
    const endSpy = spyOn<any>(tool, 'endMove');
    const tSpy = spyOn(window, 'clearTimeout');
    const iSpy = spyOn(window, 'clearInterval');
    const timeout = 23;
    const interval = 12;

    tool['keyTimeout'] = timeout;
    tool['keyInterval'] = interval;
    tool['endKeyboardMove']();

    expect(endSpy).toHaveBeenCalled();
    expect(tSpy).toHaveBeenCalledWith(timeout);
    expect(iSpy).toHaveBeenCalledWith(interval);
    expect(tool['keyTimeout']).toEqual(0);
    expect(tool['keyInterval']).toEqual(0);
  });

  it('can move selected shapes', () => {
    tool['initBoundingBox']();
    tool.editorService.selectedShapes.push(new Rectangle());
    tool['startMove']();
    const moveSpy = spyOn(tool['moveCommand'], 'execute');

    tool['move']();
    expect(tool['moveCommand'].delta).toEqual(Coordinate.subtract(tool['mousePosition'], tool['initialMouseCoord']));
    const c = new Coordinate(50, 75);
    tool['move'](c);
    expect(tool['moveCommand'].delta).toEqual(c);
    expect(moveSpy).toHaveBeenCalledTimes(2);
  });

  it('can select single shape', () => {
    tool.selectShape(shapes[0]);
    expect(tool.editorService.selectedShapes.indexOf(shapes[0])).toEqual(0);
  });

  it('can reverse selection', () => {
    tool.selectShape(shapes[0]);
    tool['addSelectedShape'](shapes[1]);

    tool.selectShape(shapes[1], true);
    tool.selectShape(shapes[2], true);

    expect(tool.editorService.selectedShapes.length).toEqual(2);
    expect(tool.editorService.selectedShapes.indexOf(shapes[0])).toEqual(0);
    expect(tool.editorService.selectedShapes.indexOf(shapes[1])).toEqual(-1);
    expect(tool.editorService.selectedShapes.indexOf(shapes[2])).toEqual(1);
  });

  it('should not add shape if already selected', () => {
    tool['addSelectedShape'](shapes[0]);
    tool['addSelectedShape'](shapes[1]);
    tool['addSelectedShape'](shapes[0]);
    tool['addSelectedShape'](shapes[0]);
    expect(tool.editorService.selectedShapes.length).toEqual(2);
  });

  it('can remove selected shape', () => {
    tool['addSelectedShape'](shapes[0]);
    tool['addSelectedShape'](shapes[1]);
    tool['removeSelectedShape'](shapes[0]);
    expect(tool.editorService.selectedShapes.indexOf(shapes[1])).toEqual(0);
    expect(tool.editorService.selectedShapes.length).toEqual(1);
  });

  it('should not remove shape if not selected', () => {
    const spliceSpy = spyOn(tool.editorService.selectedShapes, 'splice');
    tool['addSelectedShape'](shapes[0]);
    tool['removeSelectedShape'](shapes[1]);
    expect(tool.editorService.selectedShapes.length).toEqual(1);
    expect(spliceSpy).not.toHaveBeenCalled();
  });

  it('can select all shapes', () => {
    tool.editorService.addShapeToBuffer(shapes[0]);
    tool.editorService.addShapeToBuffer(shapes[1]);
    tool.editorService.addShapeToBuffer(shapes[2]);
    tool.editorService.applyShapesBuffer();

    tool.selectAll();
    expect(tool.editorService.selectedShapes.length).toEqual(3);
  });

  it('can begin selection', () => {
    tool['beginSelection'](coord1);

    expect(tool['reverseSelectionMode']).toBeFalsy();
    expect(tool['initialMouseCoord']).toEqual(coord1);
    expect(tool.editorService.selectedShapes.length).toEqual(0);
  });

  it('can begin reverse selection', () => {
    tool['beginReverseSelection'](coord1);

    expect(tool['reverseSelectionMode']).toBeTruthy();
    expect(tool['initialMouseCoord']).toEqual(coord1);
    expect(tool['previouslySelectedShapes']).toEqual(tool.editorService.selectedShapes);
  });

  it('can initialize select area', () => {
    const addPreviewSpy = spyOn(tool.editorService, 'addPreviewShape').and.callThrough();

    tool['initialMouseCoord'] = coord1;
    tool['initSelectArea']();

    expect(addPreviewSpy).toHaveBeenCalled();
    expect(tool.editorService['previewShapes'][0].primaryColor).toEqual(Color.TRANSPARENT);
    expect(tool.editorService['previewShapes'][0].origin).toEqual(coord1);
  });

  it('can initialize bounding box', () => {
    const addPreviewSpy = spyOn(tool.editorService, 'addPreviewShape').and.callThrough();

    tool['initialMouseCoord'] = coord1;
    tool['initBoundingBox']();

    expect(addPreviewSpy).toHaveBeenCalled();
    expect(tool.editorService['previewShapes'][0].origin).toEqual(coord1);
  });

  it('can reset selection', () => {
    tool.selectShape(shapes[0]);
    tool['addSelectedShape'](shapes[1]);
    tool['addSelectedShape'](shapes[2]);
    const addPreviewSpy = spyOn(tool.editorService, 'addPreviewShape');

    tool['resetSelection']();
    expect(tool.editorService['previewShapes'].length).toEqual(0);
    expect(tool.editorService.selectedShapes.length).toEqual(0);
    expect(addPreviewSpy).toHaveBeenCalledTimes(2);
  });

  it('can apply bounding box', () => {
    tool.selectShape(shapes[0]);
    tool['applyBoundingBox']();

    expect(tool.editorService['previewShapes'].length).toEqual(1);
    expect(tool.editorService['previewShapes'][0]).toEqual(tool['boundingBox']);
  });

  it('can update bounding box', () => {
    tool['addSelectedShape'](shapes[0]);
    tool['addSelectedShape'](shapes[1]);
    tool['addSelectedShape'](shapes[2]);
    tool['addSelectedShape'](shapes[3]);

    tool['initBoundingBox']();
    tool['updateBoundingBox']();

    expect(tool['boundingBox'].origin).toEqual(new Coordinate(50, 50));
    expect(tool['boundingBox'].end).toEqual(new Coordinate(300, 300));
  });

  it('can update empty bounding box', () => {
    tool['initBoundingBox']();
    tool['updateBoundingBox']();

    expect(tool.editorService.selectedShapes.length).toEqual(0);
    expect(tool['boundingBox'].origin).toEqual(new Coordinate());
    expect(tool['boundingBox'].end).toEqual(new Coordinate());
  });

  it('can detect bounding box collision', () => {
    expect(SelectionTool.detectBoundingBoxCollision(shapes[3] as Rectangle, shapes[0])).toBeTruthy();
    expect(SelectionTool.detectBoundingBoxCollision(shapes[2] as Rectangle, shapes[2])).toBeTruthy();
    expect(SelectionTool.detectBoundingBoxCollision(shapes[1] as Rectangle, shapes[3])).toBeFalsy();
    expect(SelectionTool.detectBoundingBoxCollision(shapes[0] as Rectangle, shapes[1])).toBeFalsy();
  });

  it('can update selection', () => {
    const resetSpy = spyOn<any>(tool, 'resetSelection');
    const resizeSpy = spyOn<any>(tool, 'resizeSelectArea');
    const addSpy = spyOn<any>(tool, 'addSelectedShape');
    const updateSpy = spyOn<any>(tool, 'updateBoundingBox');

    tool.editorService.shapes.push(...shapes);
    tool['selectArea'] = new Rectangle(new Coordinate(), 500, 500);
    tool['updateSelection']();

    expect(resetSpy).toHaveBeenCalled();
    expect(resizeSpy).toHaveBeenCalled();
    expect(addSpy).toHaveBeenCalledTimes(4);
    expect(updateSpy).toHaveBeenCalled();
  });

  it('can update reverse selection', () => {
    const resetSpy = spyOn<any>(tool, 'resetSelection');
    const resizeSpy = spyOn<any>(tool, 'resizeSelectArea');
    const reverseSpy = spyOn<any>(tool, 'reverseSelection');
    const updateSpy = spyOn<any>(tool, 'updateBoundingBox');

    tool.editorService.shapes.push(...shapes);
    tool.editorService.selectedShapes.push(shapes[0]);
    tool['beginReverseSelection'](new Coordinate());
    tool['selectArea'] = new Rectangle(new Coordinate(), 500, 500);
    tool['updateSelection'](true);

    expect(resetSpy).toHaveBeenCalled();
    expect(resizeSpy).toHaveBeenCalled();
    expect(reverseSpy).toHaveBeenCalledTimes(4);
    expect(updateSpy).toHaveBeenCalled();
  });

  // todo - update bounding box

  // todo - detect collision

  it('can resize select area', () => {
    tool['initSelectArea']();
    tool['resizeSelectArea'](coord1, coord2);

    expect(tool['selectArea'].origin).toEqual(coord1);
    expect(tool['selectArea'].end).toEqual(coord2);
  });
});
