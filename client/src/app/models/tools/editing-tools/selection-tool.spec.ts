import { TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { EditorService } from 'src/app/services/editor.service';
import { MouseListenerService } from 'src/app/services/event-listeners/mouse-listener/mouse-listener.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { BaseShape } from '../../shapes/base-shape';
import { Rectangle } from '../../shapes/rectangle';
import { SelectionTool } from './selection-tool';

/* tslint:disable:no-string-literal */
/* tslint:disable:no-magic-numbers */

export const mouseDown = (c: Coordinate = new Coordinate(), rightClick: boolean = false): MouseEvent => {
  return {
    button: rightClick ? MouseListenerService.BUTTON_RIGHT : MouseListenerService.BUTTON_LEFT,
    type: 'mousedown',
    offsetX: c.x,
    offsetY: c.y,
  } as MouseEvent;
};

export const mouseMove = (c: Coordinate = new Coordinate()): MouseEvent => {
  return {
    type: 'mousemove',
    offsetX: c.x,
    offsetY: c.y,
  } as MouseEvent;
};

fdescribe('SelectionTool', () => {
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
    expect(tool['reverseSelectionArray']).toEqual(tool.editorService.selectedShapes);
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
    expect(tool['detectBoundingBoxCollision'](shapes[3] as Rectangle, shapes[0])).toBeTruthy();
    expect(tool['detectBoundingBoxCollision'](shapes[2] as Rectangle, shapes[2])).toBeTruthy();
    expect(tool['detectBoundingBoxCollision'](shapes[1] as Rectangle, shapes[3])).toBeFalsy();
    expect(tool['detectBoundingBoxCollision'](shapes[0] as Rectangle, shapes[1])).toBeFalsy();
  });

  it('can update selection', () => {
    tool.handleMouseDown(mouseDown());
    tool.handleMouseMove(mouseMove(new Coordinate(500, 500)));

    expect(tool.editorService.selectedShapes.length).toEqual(4);
  });
});
